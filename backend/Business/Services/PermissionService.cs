using Business.Repository;
using Dapper;
using DTOs.Request.MenuDTOs;
using DTOs.Request.PermissionDTOs;
using DTOs.Request.RoleDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Business.Services
{
    public class PermissionService : IPermissionRepository
    {
        private readonly string _connectionString;

        public PermissionService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<ResponseObject<List<PermissionDTO>>> GetAllPermission()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<PermissionDTO>(
                    "GetAllPermission",        //Tên Stored Procedure
                    commandType: CommandType.StoredProcedure
                );

                return new ResponseObject<List<PermissionDTO>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = result.ToList() };
            }
        }

        public async Task<ResponseObject<PermissionDTO>> GetPermissionById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<PermissionDTO>(
                    "GetPermissionById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return new ResponseObject<PermissionDTO> { Status = StatusCodes.Status200OK, Message = "Lấy Permission thành công.", Data = result };
            }
        }

        public async Task<ResponseText> CreatePermission(PermissionInput permissionInput)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@PermissionName", permissionInput.PermissionName, DbType.String);
                parameters.Add("@DisplayName", permissionInput.DisplayName, DbType.String);
                parameters.Add("@GroupName", permissionInput.PermissionName.Split(".")[0], DbType.String);
                parameters.Add("@Status", permissionInput.Status, DbType.Boolean);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "CreatePermission",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status201Created);
            }
        }

        public async Task<ResponseText> DeletePermission(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "DeletePermission",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Xoá thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseText> UpdatePermission(int id, PermissionInput permissionInput)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@PermissionName", permissionInput.PermissionName, DbType.String);
                parameters.Add("@DisplayName", permissionInput.DisplayName, DbType.String);
                parameters.Add("@GroupName", permissionInput.PermissionName.Split(".")[0], DbType.String);
                parameters.Add("@Status", permissionInput.Status, DbType.Boolean);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "UpdatePermission",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Sửa thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<bool> CheckRolePermission(int roleId, string permissionName)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@roleId", roleId, DbType.Int32);
                parameters.Add("@permissionName", permissionName, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteScalarAsync<int>(
                    "CheckRolePermission",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return result == 1; // Trả về true nếu có quyền, false nếu không
            }
        }
    }
}
