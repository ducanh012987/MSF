using Business.Repository;
using DTOs.Request.PermissionDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionRepository _permissionRepository;

        public PermissionController(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _permissionRepository.GetAllPermission());
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _permissionRepository.GetPermissionById(id));
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateRole(PermissionInput permissionInput)
        {
            return Ok(await _permissionRepository.CreatePermission(permissionInput));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateRole(int id, PermissionInput permissionInput)
        {
            return Ok(await _permissionRepository.UpdatePermission(id, permissionInput));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            return Ok(await _permissionRepository.DeletePermission(id));
        }
    }
}
