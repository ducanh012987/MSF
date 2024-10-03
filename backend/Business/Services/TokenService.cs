﻿using Azure.Core;
using Business.Repository;
using Dapper;
using DTOs;
using DTOs.Request.RefreshTokenDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Business.Services
{
    public class TokenService : ITokenRepository
    {
        private readonly string _connectionString;
        private readonly JwtSettings _jwtSettings;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IServiceProvider _serviceProvider;

        public TokenService(string connectionString, IOptionsMonitor<JwtSettings> jwtSettings, IHttpContextAccessor contextAccessor, IServiceProvider serviceProvider)
        {
            _connectionString = connectionString;
            _jwtSettings = jwtSettings.CurrentValue;
            _contextAccessor = contextAccessor;
            _serviceProvider = serviceProvider;
        }

        private IUserRepository GetUserRepository()
        {
            return _serviceProvider.GetService<IUserRepository>()!;
        }

        // Tạo access token
        public string GenerateToken(UserDto userDto)
        {
            // thêm dữ liệu vào token
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Name, userDto.Username!),
                new Claim(JwtRegisteredClaimNames.Email, userDto.Email!),
                new Claim("FullName", userDto.Fullname!),
                new Claim(ClaimTypes.Role, userDto.Roles!.RoleName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // cấu hình token
            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            //Lưu token vào cookies
            var cookies = _contextAccessor.HttpContext.Response.Cookies;
            cookies.Append("AccessToken", tokenString, new CookieOptions
            {
                HttpOnly = false,
                Secure = true, // Đảm bảo sử dụng HTTPS
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes),
                Path = "/",
                Domain = "localhost"
            });

            return tokenString;
        }

        // tạo refresh token
        public string GenerateRefreshToken(UserDto userDto)
        {
            var refreshToken = Guid.NewGuid().ToString();
            var tokenDto = new RefreshTokenDto
            {
                RefreshToken = refreshToken,
                TimeExpired = DateTime.Now.AddDays(_jwtSettings.ExpiresInDays),
                UserId = userDto.Id
            };
            SaveRefreshToken(tokenDto);

            //Lưu token vào cookies
            var cookies = _contextAccessor.HttpContext.Response.Cookies;
            cookies.Append("RefreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = false,
                Secure = true, // Đảm bảo sử dụng HTTPS
                SameSite = SameSiteMode.None,
                Expires = DateTime.Now.AddDays(_jwtSettings.ExpiresInDays),
                Path = "/",
                Domain = "localhost"
            });

            return refreshToken;
        }

        // tạo mới access token
        public async Task<ResponseObject<TokenResult>> RefreshAccessToken(string accessToken, string refreshToken)
        {
            // Kiểm tra xem access token có còn hạn không
            if (IsAccessTokenValid(accessToken))
            {
                // Nếu access token còn hạn, tiếp tục phiên đăng nhập
                return new ResponseObject<TokenResult>
                {
                    Status = StatusCodes.Status200OK,
                    Message = "AccessToken còn hạn.",
                    Data = new TokenResult
                    {
                        AccessToken = accessToken,
                        RefreshToken = refreshToken
                    }
                };
            }

            // Nếu accessToken hết hạn, kiểm tra refreshToken
            var token = await GetRefreshTokenByToken(refreshToken);
            if (token.TimeExpired < DateTime.Now)
            {
                // Nếu refresh token hết hạn, yêu cầu đăng nhập lại
                throw new CustomException(StatusCodes.Status400BadRequest, "RefreshToken đã hết hạn. Vui lòng đăng nhập lại!");
            }

            // nếu refreshtoken còn hạn, lấy ra user
            var userRepo = GetUserRepository();
            var user = await userRepo.GetUser(token.UserId);

            //tạo accessToken mới
            var accessTokenNew = GenerateToken(user);

            var tokenResult = new TokenResult
            {
                AccessToken = accessTokenNew,
                RefreshToken = refreshToken,
            };

            return new ResponseObject<TokenResult> { Status = StatusCodes.Status200OK, Message = "Khởi tạo token thành công.", Data = tokenResult };
        }

        // lưu refresh token
        public ResponseText SaveRefreshToken(RefreshTokenDto tokenDto)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RefreshToken", tokenDto.RefreshToken, DbType.String);
                parameters.Add("@TimeExpired", tokenDto.TimeExpired, DbType.DateTime);
                parameters.Add("@UserId", tokenDto.UserId, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = connection.ExecuteAsync(
                    "SaveRefreshToken",   //Tên Stored Procedure
                    parameters,   //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return ResponseText.ResponseSuccess("Lưu thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<RefreshTokenDto> GetRefreshTokenByToken(string refreshToken)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RefreshToken", refreshToken, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<RefreshTokenDto>(
                    "GetRefreshTokenByToken",   //Tên Stored Procedure
                    parameters,   //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return result ?? throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy RefreshToken.");
            }
        }

        // Kiểm tra thời hạn Token
        public bool IsAccessTokenValid(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return false; // Token không hợp lệ nếu rỗng hoặc null
            }

            var handler = new JwtSecurityTokenHandler();
            
            // Giải mã token để lấy thông tin payload
            var jwtToken = handler.ReadJwtToken(token);

            // Lấy thời gian hết hạn từ payload
            var expirationTime = jwtToken.ValidTo;

            // Kiểm tra xem thời gian hết hạn có lớn hơn thời gian hiện tại không
            return expirationTime > DateTime.UtcNow;
        }
    }
}
