using Business.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp_API.Authorization;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "PermissionPolicy")]
    public class LogController : ControllerBase
    {
        private readonly ILogRepository _logRepository;

        public LogController(ILogRepository logRepository)
        {
            _logRepository = logRepository;
        }

        [AuthorizePermission(Permissions.Log.View)]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            return Ok(await _logRepository.GetAllLog(pageNumber, pageSize));
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetLogById(int id)
        {
            return Ok(await _logRepository.GetLogById(id));
        }
    }
}
