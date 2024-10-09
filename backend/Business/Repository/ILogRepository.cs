using DTOs.Request.LogDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface ILogRepository
    {
        Task<ResponseObject<PagedResult<LogDTO>>> GetAllLog(int pageNumber, int pageSize);
        Task<ResponseObject<LogDTO>> GetLogById(int id);
    }
}
