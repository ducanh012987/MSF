using Business.Repository;
using DTOs.Request.RoleDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;
        public RoleController(IRoleRepository roleRepository)
        { 
            _roleRepository = roleRepository;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            return Ok(await _roleRepository.GetAllRole(pageNumber, pageSize));
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetRoleById(int id)
        {
            return Ok(await _roleRepository.GetRoleById(id));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(RoleInput roleInput)
        {
            return Ok(await _roleRepository.CreateRole(roleInput));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, RoleInput roleInput)
        {
            return Ok(await _roleRepository.UpdateRole(id, roleInput));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Ok(await _roleRepository.DeleteRole(id));
        }
    }
}
