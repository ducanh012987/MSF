using Business.Repository;
using DTOs.Request.AccessDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenRepository _tokenRepository;

        public AccessController(IUserRepository userRepository, ITokenRepository tokenRepository)
        {
            _userRepository = userRepository;
            _tokenRepository = tokenRepository;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            return Ok(await _userRepository.Login(loginRequest));
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            return Ok(await _userRepository.Register(registerRequest));
        }

        [HttpPost("Refresh-Token")]
        public async Task<IActionResult> RefreshAccessToken(string accessToken, string refreshToken)
        {
            return Ok(await _tokenRepository.RefreshAccessToken(accessToken, refreshToken));
        }
    }
}
