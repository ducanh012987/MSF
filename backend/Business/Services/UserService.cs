﻿using Business.Repository;
using Dapper;
using DTOs.Request.AccessDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Security.Cryptography;
using System.Text;

namespace Business.Services
{
    public class UserService : IUserRepository
    {
        private readonly string _connectionString;
        private readonly PasswordHasher<string> _passwordHasher;
        private readonly ITokenRepository _tokenRepository;

        public UserService(string connectionString, ITokenRepository tokenRepository)
        {
            _connectionString = connectionString;
            _passwordHasher = new PasswordHasher<string>();
            _tokenRepository = tokenRepository;
        }

        public async Task<ResponseObject<LoginResult>> Login(LoginRequest loginRequest)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", loginRequest.Username, DbType.String);
                parameters.Add("@Password", HashPassword(loginRequest.Password!), DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<UserDto>(
                    "Login",   //Tên Stored Procedure
                    parameters,            //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                if (result == null)
                {
                    throw new CustomException(StatusCodes.Status400BadRequest, "Sai tài khoản hoặc mật khẩu!");
                }

                if (result.Locked == true)
                {
                    throw new CustomException(StatusCodes.Status400BadRequest, "Tài khoản của bạn bị khoá!");
                }

                var token = _tokenRepository.GenerateToken(result);
                var refreshToken = _tokenRepository.GenerateRefreshToken(result);
                var userRequest = UserRequest.FromUserDto(result);
                var loginResult = LoginResult.LoginSuccess(token, refreshToken, userRequest);
                return new ResponseObject<LoginResult> { Status = StatusCodes.Status200OK, Message = "Đăng nhập thành công.", Data = loginResult };
            }

        }

        public async Task<ResponseText> Register(RegisterRequest registerRequest)
        {
            // mã hoá mật khẩu
            var hashedPassword = HashPassword(registerRequest.Password!);

            // Add vào db
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", registerRequest.Username, DbType.String);
                parameters.Add("@Password", hashedPassword, DbType.String);
                parameters.Add("@Fullname", registerRequest.Fullname, DbType.String);
                parameters.Add("@Email", registerRequest.Email, DbType.String);
                parameters.Add("@Locked", 0, DbType.Boolean);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "Register",   //Tên Stored Procedure
                    parameters,   //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return ResponseText.ResponseSuccess("Đăng ký thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseObject<PagedResult<UserDto>>> GetAllUser(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "PageNumber và PageSize phải lớn hơn 0");
            }
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@PageNumber", pageNumber, DbType.Int32);
                parameters.Add("@PageSize", pageSize, DbType.Int32);

                // Lấy tổng số user
                int totalUsers = await connection.ExecuteScalarAsync<int>("GetTotalUserCount", commandType: CommandType.StoredProcedure);

                // Lấy danh sách user
                var result = await connection.QueryAsync<UserDto>(
                    "GetAllUser",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                var pagedResult = new PagedResult<UserDto>
                {
                    TotalRecords = totalUsers,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    Data = result.ToList()
                };
                return new ResponseObject<PagedResult<UserDto>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = pagedResult };
            }
        }

        public async Task<ResponseObject<UserDto>> GetUserById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<UserDto>(
                    "GetUserById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return new ResponseObject<UserDto> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = result };
            }
        }

        public async Task<ResponseText> CreateUser(UserInput userInput)
        {
            string roleIdsJson = JsonConvert.SerializeObject(userInput.RoleIds);

            // mã hoá mật khẩu
            var hashedPassword = HashPassword("1");

            // Add vào db
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", userInput.Username, DbType.String);
                parameters.Add("@Password", hashedPassword, DbType.String);
                parameters.Add("@Fullname", userInput.Fullname, DbType.String);
                parameters.Add("@Email", userInput.Email, DbType.String);
                parameters.Add("@Locked", userInput.Locked, DbType.Boolean);
                parameters.Add("@RoleIds", roleIdsJson, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "CreateUser",   //Tên Stored Procedure
                    parameters,   //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseText> UpdateUser(int id, UserUpdate userUpdate)
        {
            string roleIdsJson = JsonConvert.SerializeObject(userUpdate.RoleIds);

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@Fullname", userUpdate.Fullname, DbType.String);
                parameters.Add("@Email", userUpdate.Email, DbType.String);
                parameters.Add("@Locked", userUpdate.Locked, DbType.Boolean);
                parameters.Add("@RoleIds", roleIdsJson, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "UpdateUser",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Sửa thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseText> DeleteUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "DeleteUser",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Xoá thành công.", StatusCodes.Status200OK);
            }
        }

        // Mã hoá mật khẩu
        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var combinedPassword = password;
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(combinedPassword));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        public async Task<UserDto> GetUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<UserDto>(
                    "GetUserById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                if (result == null)
                    throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy User");
                return result.FirstOrDefault()!;
            }
        }
    }
}
