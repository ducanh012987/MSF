using DTOs.Request.MenuDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface IMenuRepository
    {
        Task<ResponseObject<List<MenuDTO>>> GetAllMenu();
        Task<ResponseObject<MenuDTO>> GetMenuById(int id);
        Task<ResponseText> CreateMenu(MenuInput menuInput);
        Task<ResponseText> UpdateMenu(int id, MenuInput menuInput);
        Task<ResponseText> DeleteMenu(int id);
    }
}
