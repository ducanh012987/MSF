using Business.Repository;
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
        public async Task<IActionResult> CreateRole(string roleName)
        {
            return Ok(await _roleRepository.CreateRole(roleName));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, string roleName)
        {
            return Ok(await _roleRepository.UpdateRole(id, roleName));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Ok(await _roleRepository.DeleteRole(id));
        }
    }
}
