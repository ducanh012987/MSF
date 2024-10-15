using Business.Repository;
using Dapper;
using Data.Models;
using DTOs.Request.MenuDTOs;
using DTOs.Request.PermissionDTOs;
using DTOs.Request.RoleDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Security;

namespace Business.Services
{
    public class RoleService : IRoleRepository
    {
        private readonly string _connectionString;

        public RoleService(string connectionString)
        {
            _connectionString = connectionString;
        }

        // Lấy tất cả role
        public async Task<ResponseObject<PagedResult<RoleDTO>>> GetAllRole(int pageNumber, int pageSize)
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

                // Lấy tổng số role
                int totalRoles = await connection.ExecuteScalarAsync<int>("GetTotalRoleCount", commandType: CommandType.StoredProcedure);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<RoleDTO>(
                    "GetAllRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                var pagedResult = new PagedResult<RoleDTO>
                {
                    TotalRecords = totalRoles,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    Data = result.ToList()
                };
                return new ResponseObject<PagedResult<RoleDTO>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = pagedResult };
            }
        }

        //Lấy role theo id
        public async Task<ResponseObject<RoleDTO>> GetRoleById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<RoleDTO>(
                    "GetRoleById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return new ResponseObject<RoleDTO> { Status = StatusCodes.Status200OK, Message = "Lấy Role thành công.", Data = result };
            }
        }

        // Tạo role
        public async Task<ResponseText> CreateRole(RoleInput roleInput)
        {
            string permissionIdsJson = JsonConvert.SerializeObject(roleInput.PermissionIds);
            string menuIdsJson = JsonConvert.SerializeObject(roleInput.MenuIds);

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@RoleName", roleInput.RoleName!.ToUpper(), DbType.String);
                parameters.Add("@Status", roleInput.Status, DbType.Boolean);
                parameters.Add("@PermissionIds", permissionIdsJson, DbType.String);
                parameters.Add("@MenuIds", menuIdsJson, DbType.String);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "CreateRole",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status201Created);
            }
        }

        // Sửa role
        public async Task<ResponseText> UpdateRole(int id, RoleInput roleInput)
        {
            string permissionIdsJson = JsonConvert.SerializeObject(roleInput.PermissionIds);
            string menuIdsJson = JsonConvert.SerializeObject(roleInput.MenuIds);

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@RoleName", roleInput.RoleName!.ToUpper(), DbType.String);
                parameters.Add("@Status", roleInput.Status, DbType.Boolean);
                parameters.Add("@PermissionIds", permissionIdsJson, DbType.String);
                parameters.Add("@MenuIds", menuIdsJson, DbType.String);

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
    }
}
