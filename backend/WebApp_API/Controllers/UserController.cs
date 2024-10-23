using Business.Repository;
using DTOs.Request.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApp_API.Authorization;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "PermissionPolicy")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [AuthorizePermission(Permissions.User.View)]
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            return Ok(await _userRepository.GetAllUser(pageNumber, pageSize));
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            return Ok(await _userRepository.GetUserById(id));
        }

        [AuthorizePermission(Permissions.User.Create)]
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(UserInput userInput)
        {
            return Ok(await _userRepository.CreateUser(userInput));
        }

        [AuthorizePermission(Permissions.User.Update)]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdate userUpdate)
        {
            return Ok(await _userRepository.UpdateUser(id, userUpdate));
        }

        [AuthorizePermission(Permissions.User.Delete)]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            return Ok(await _userRepository.DeleteUser(id));
        }
    }
}
