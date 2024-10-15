using Business.Repository;
using DTOs.Request.MenuDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class MenuController : ControllerBase
    {
        private readonly IMenuRepository _menuRepository;

        public MenuController(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

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

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(MenuInput menuInput)
        {
            return Ok(await _menuRepository.CreateMenu(menuInput));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, MenuInput menuInput)
        {
            return Ok(await _menuRepository.UpdateMenu(id, menuInput));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Ok(await _menuRepository.DeleteMenu(id));
        }
    }
}
