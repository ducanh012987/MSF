using Business.Repository;
using DTOs.Request.MenuDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp_API.Authorization;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "PermissionPolicy")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;

        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        [AuthorizePermission(Permissions.Menu.View)]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _menuRepository.GetAllMenu());
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _menuRepository.GetMenuById(id));
        }

        [AuthorizePermission(Permissions.Menu.Create)]
        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(MenuInput menuInput)
        {
            return Ok(await _menuRepository.CreateMenu(menuInput));
        }

        [AuthorizePermission(Permissions.Menu.Update)]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, MenuInput menuInput)
        {
            return Ok(await _menuRepository.UpdateMenu(id, menuInput));
        }

        [AuthorizePermission(Permissions.Menu.Delete)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Ok(await _menuRepository.DeleteMenu(id));
        }
    }
}
