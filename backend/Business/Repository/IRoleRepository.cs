using Data.Models;
using DTOs.Responses;

namespace Business.Repository
{
    public interface IRoleRepository
    {
        Task<ResponseObject<PagedResult<Roles>>> GetAllRole(int pageNumber, int pageSize);
        Task<ResponseObject<Roles>> GetRoleById(int id);
        Task<ResponseText> CreateRole(string rolename);
        Task<ResponseText> UpdateRole(int id, string rolename);
        Task<ResponseText> DeleteRole(int id);
        Task<bool> CheckRoleByRolename(string rolename);
        Task<bool> CheckRoleById (int id);
    }
}
