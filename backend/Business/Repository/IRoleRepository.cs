using DTOs.Request.RoleDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface IRoleRepository
    {
        Task<ResponseObject<PagedResult<RoleDTO>>> GetAllRole(int pageNumber, int pageSize);
        Task<ResponseObject<RoleDTO>> GetRoleById(int id);
        Task<ResponseText> CreateRole(RoleInput roleInput);
        Task<ResponseText> UpdateRole(int id, RoleInput roleInput);
        Task<ResponseText> DeleteRole(int id);
    }
}
