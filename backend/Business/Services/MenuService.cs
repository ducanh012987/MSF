using Business.Repository;
using Dapper;
using DTOs.Request.MenuDTOs;
using DTOs.Request.RoleDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Business.Services
{
    public class MenuService : IMenuRepository
    {
        private readonly string _connectionString;

        public MenuService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<ResponseObject<List<MenuDTO>>> GetAllMenu()
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryAsync<MenuDTO>(
                    "GetAllMenu",        //Tên Stored Procedure
                    commandType: CommandType.StoredProcedure
                );

                return new ResponseObject<List<MenuDTO>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = result.ToList() };
            }
        }

        public async Task<ResponseObject<MenuDTO>> GetMenuById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<MenuDTO>(
                    "GetMenuById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return new ResponseObject<MenuDTO> { Status = StatusCodes.Status200OK, Message = "Lấy Menu thành công.", Data = result };
            }
        }

        public async Task<ResponseText> CreateMenu(MenuInput menuInput)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@DisplayName", menuInput.DisplayName, DbType.String);
                parameters.Add("@Url", menuInput.Url, DbType.String);
                parameters.Add("@Icon", menuInput.Icon, DbType.String);
                parameters.Add("@Status", menuInput.Status, DbType.Boolean);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "CreateMenu",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Thêm thành công.", StatusCodes.Status201Created);
            }
        }

        public async Task<ResponseText> DeleteMenu(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "DeleteMenu",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Xoá thành công.", StatusCodes.Status200OK);
            }
        }

        public async Task<ResponseText> UpdateMenu(int id, MenuInput menuInput)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);
                parameters.Add("@DisplayName", menuInput.DisplayName, DbType.String);
                parameters.Add("@Url", menuInput.Url, DbType.String);
                parameters.Add("@Icon", menuInput.Icon, DbType.String);
                parameters.Add("@Status", menuInput.Status, DbType.Boolean);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.ExecuteAsync(
                    "UpdateMenu",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );
                return ResponseText.ResponseSuccess("Sửa thành công.", StatusCodes.Status200OK);
            }
        }
    }
}
