using Business.Repository;
using Dapper;
using DTOs.Request.LogDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Business.Services
{
    public class LogService : ILogRepository
    {
        private readonly string _connectionString;

        public LogService(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<ResponseObject<PagedResult<LogDTO>>> GetAllLog(int pageNumber, int pageSize)
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

                // Lấy tổng số log
                int totalLogs = await connection.ExecuteScalarAsync<int>("GetTotalLogCount", commandType: CommandType.StoredProcedure);

                // Lấy danh sách log
                var result = connection.Query<LogDTO>(
                    "GetAllLog",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                ).ToList();

                var pagedResult = new PagedResult<LogDTO>
                {
                    TotalRecords = totalLogs,
                    PageNumber = pageNumber,
                    PageSize = pageSize,
                    Data = result
                };
                return new ResponseObject<PagedResult<LogDTO>> { Status = StatusCodes.Status200OK, Message = "Lấy dữ liệu thành công.", Data = pagedResult };
            }
        }

        public async Task<ResponseObject<LogDTO>> GetLogById(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var parameters = new DynamicParameters();
                parameters.Add("@Id", id, DbType.Int32);

                //Gọi Stored Procedure bằng Dappper
                var result = await connection.QueryFirstOrDefaultAsync<LogDTO>(
                    "GetLogById",        //Tên Stored Procedure
                    parameters,         //Tham số truyền vào
                    commandType: CommandType.StoredProcedure
                );

                if (result == null)
                    throw new Exception("Không tìm thấy Log");
                return new ResponseObject<LogDTO> { Status = StatusCodes.Status200OK, Message = "Lấy Log thành công.", Data = result };
            }
        }
    }
}
