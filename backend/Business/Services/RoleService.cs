using Business.Repository;
using Dapper;
using Data.Models;
using DTOs.Request.UserDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Business.Services
{
    public class RoleService : IRoleRepository
    {
        private readonly string _connectionString;
        private readonly ResponseObject<Roles> _responseObject;

        public RoleService(string connectionString, ResponseObject<Roles> responseObject)
        {
            _connectionString = connectionString;
            _responseObject = responseObject;
        }

        // Lấy tất cả role
        public async Task<ResponseObject<PagedResult<Roles>>> GetAllRole(int pageNumber, int pageSize)
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
                var result = connection.Query<Roles>(
                    "GetAllRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                ).ToList();

                var pagedResult = new PagedResult<Roles>
                {
                    TotalRecords = result.Count,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    Data = result
                };
                return new ResponseObject<PagedResult<Roles>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = pagedResult };
            }
        }

        //Lấy role theo id
        public async Task<ResponseObject<Roles>> GetRoleById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<Roles>(
                    "GetRoleById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                if (result == null)
                    throw new Exception("Không tìm thấy Role");
                return _responseObject.ResponseSuccess("Lấy Role thành công.", result);
                //return new ResponseObject<Roles> { Status = StatusCodes.Status200OK, Message = "Lấy Role thành công.", Data = result };
            }
        }

        // Tạo role
        public async Task<ResponseText> CreateRole(string rolename)
        {
            if (await CheckRoleByRolename(rolename.ToUpper()))
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "Role Name đã tồn tại!");
            }

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RoleName", rolename.ToUpper(), DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = connection.Execute(
                    "CreateRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status201Created);
            }
        }

        // Sửa role
        public async Task<ResponseText> UpdateRole(int id, string rolename)
        {
            if (!await CheckRoleById(id))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy Role");
            }

            if (await CheckRoleByRolename(rolename.ToUpper()))
            {
                throw new CustomException(StatusCodes.Status400BadRequest, "Role Name đã tồn tại!");
            }

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@RoleName", rolename.ToUpper(), DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "UpdateRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Sửa thành công.", StatusCodes.Status200OK);
            }
        }

        // Xoá role
        public async Task<ResponseText> DeleteRole(int id)
        {
            if (!await CheckRoleById(id))
            {
                throw new CustomException(StatusCodes.Status404NotFound, "Không tìm thấy Role");
            }

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "DeleteRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Xoá thành công.", StatusCodes.Status200OK);
            }
        }

        // Kiểm tra role theo rolename
        public async Task<bool> CheckRoleByRolename(string rolename)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RoleName", rolename.ToUpper(), DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<int>(
                    "CheckRoleByRolename",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return result > 0;
            }
        }

        // Kiểm tra role theo id
        public async Task<bool> CheckRoleById (int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<int>(
                    "CheckRoleById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                return result > 0;
            }
        }
    }
}
