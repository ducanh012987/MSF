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

        [HttpGet("getById")]
        public async Task<IActionResult> GetRoleById(int id)
        {
            return Ok(await _roleRepository.GetRoleById(id));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(string roleName)
        {
            return Ok(await _roleRepository.CreateRole(roleName));
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateRole(string roleName)
        {
            return Ok(await _roleRepository.CreateRole(roleName));
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteRole(string roleName)
        {
            return Ok(await _roleRepository.CreateRole(roleName));
        }
    }
}
