using Business.Repository;
using Dapper;
using Data.Models;
using DTOs.Request.AccessDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Business.Services
{
    public class UserService : IUserRepository
    {
        private readonly string _connectionString;
        private readonly PasswordHasher<string> _passwordHasher;
        private readonly ResponseObject<LoginResult> _responseObject;
        private readonly ITokenRepository _tokenRepository;
        private readonly IRoleRepository _roleRepository;

        public UserService(string connectionString, ResponseObject<LoginResult> responseObject, ITokenRepository tokenRepository, IRoleRepository roleRepository)
        {
            _connectionString = connectionString;
            _passwordHasher = new PasswordHasher<string>();
            _responseObject = responseObject;
            _tokenRepository = tokenRepository;
            _roleRepository = roleRepository;
        }

        public async Task<ResponseObject<LoginResult>> Login(LoginRequest loginRequest)
        {
            // Kiểm tra username
            var user = await GetUserByUsername(loginRequest.Username!);
            if (user == null)
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "Sai tài khoản hoặc mật khẩu!");
            }

            if (user.Locked == true)
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "Tài khoản của bạn bị khoá!");
            }

            // kiểm tra mật khẩu
            var passwordVerifyResult = VerifyPassword(user.Password!, loginRequest.Password!);

            if (!passwordVerifyResult)
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "Sai tài khoản hoặc mật khẩu!");
            }

            var token = _tokenRepository.GenerateToken(user);
            var refreshToken = _tokenRepository.GenerateRefreshToken(user);
            var userRequest = UserRequest.FromUserDto(user);
            var loginResult = LoginResult.LoginSuccess(token, refreshToken, userRequest);
            return _responseObject.ResponseSuccess("Đăng nhập thành công.", loginResult);
        }

        public async Task<ResponseText> Register(RegisterRequest registerRequest)
        {
            // Check user
            if (await CheckUserByUsername(registerRequest.Username))
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "User đã tồn tại!");
            }

            // mã hoá mật khẩu
            var hashedPassword = HashPassword(registerRequest.Password);

            // Add vào db
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", registerRequest.Username, DbType.String);
                parameters.Add("@Password", hashedPassword, DbType.String);
                parameters.Add("@Fullname", registerRequest.Fullname, DbType.String);
                parameters.Add("@Email", registerRequest.Email, DbType.String);
                parameters.Add("Locked", 0, DbType.Boolean);
                parameters.Add("RoleId", 2, DbType.Int32);

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

                //Gọi Stored Procedure bằng Dappper
                var result = connection.Query<UserDto>(
                    "GetAllUser",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                ).ToList();

                var pagedResult = new PagedResult<UserDto>
                {
                    TotalRecords = result.Count,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    Data = result
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
                var result = await connection.QueryAsync<UserDto, Roles, UserDto>(
                    "GetUserById",        //Tên Stored Procedure
                    (userDto, role) =>  // Callback function để ánh xạ role vào user
                    {
                        userDto.RoleId = role.Id;
                        userDto.Roles = role;
                        return userDto;
                    },
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure,
                    splitOn: "RoleId" // Dapper sẽ chia dữ liệu tại RoleId
                );

                if (result == null)
                    throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy User");
                return new ResponseObject<UserDto> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = result.FirstOrDefault() };
            }
        }

        public async Task<UserDto> GetUserByUsername(string username)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", username, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<UserDto, Roles, UserDto>(
                    "GetUserByUsername",   //Tên Stored Procedure
                    (userDto, role) =>  // Callback function để ánh xạ role vào user
                    {
                        userDto.RoleId = role.Id;
                        userDto.Roles = role;
                        return userDto;
                    },
                    parameters,            //Tham số truyền vào
                    commandType: CommandType.StoredProcedure,
                    splitOn: "RoleId" // Dapper sẽ chia dữ liệu tại RoleId
                );
                return result.FirstOrDefault()!;
            }
        }

        public async Task<ResponseText> CreateUser(UserInput userInput)
        {
            // Check user
            if (await CheckUserByUsername(userInput.Username!))
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "User đã tồn tại!");
            }

            if (!await _roleRepository.CheckRoleById(userInput.RoleId))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "Role không tồn tại!");
            }

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
                parameters.Add("Locked", userInput.Locked, DbType.Boolean);
                parameters.Add("RoleId", userInput.RoleId, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "CreateUser",   //Tên Stored Procedure
                    parameters,   //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseText> UpdateUser(int id, string fullname, string email, bool locked, int roleid)
        {
            if (!await CheckUserById(id))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "User không tồn tại!");
            }

            if (!await _roleRepository.CheckRoleById(roleid))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "Role không tồn tại!");
            }

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@Fullname", fullname, DbType.String);
                parameters.Add("@Email", email, DbType.String);
                parameters.Add("@Locked", locked, DbType.Boolean);
                parameters.Add("@RoleId", roleid, DbType.Int32);

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
            if (!await CheckUserById(id))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "User không tồn tại!");
            }

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

        public async Task<bool> CheckUserByUsername(string username)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Username", username, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<int>(
                    "CheckUserByUsername",   //Tên Stored Procedure
                    parameters,            //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return result > 0;
            }
        }

        public async Task<bool> CheckUserById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<int>(
                    "CheckUserById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return result > 0;
            }
        }

        // Mã hoá mật khẩu
        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null!, password);
        }

        // Kiểm tra mật khẩu có đúng không
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(null!, hashedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

        public async Task<UserDto> GetUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<UserDto, Roles, UserDto>(
                    "GetUserById",        //Tên Stored Procedure
                    (userDto, role) =>  // Callback function để ánh xạ role vào user
                    {
                        userDto.RoleId = role.Id;
                        userDto.Roles = role;
                        return userDto;
                    },
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure,
                    splitOn: "RoleId" // Dapper sẽ chia dữ liệu tại RoleId
                );

                if (result == null)
                    throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy User");
                return result.FirstOrDefault()!;
            }
        }
    }
}
