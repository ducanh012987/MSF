using Business.Repository;
using DTOs.Request.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "ADMIN")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

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

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser(UserInput userInput)
        {
            return Ok(await _userRepository.CreateUser(userInput));
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdate userUpdate)
        {
            return Ok(await _userRepository.UpdateUser(id, userUpdate));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            return Ok(await _userRepository.DeleteUser(id));
        }
    }
}
