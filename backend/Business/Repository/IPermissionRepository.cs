using DTOs.Request.PermissionDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface IPermissionRepository
    {
        Task<ResponseObject<List<PermissionDTO>>> GetAllPermission();
        Task<ResponseObject<PermissionDTO>> GetPermissionById(int id);
        Task<ResponseText> CreatePermission(PermissionInput permissionInput);
        Task<ResponseText> UpdatePermission(int id, PermissionInput permissionInput);
        Task<ResponseText> DeletePermission(int id);
    }
}
