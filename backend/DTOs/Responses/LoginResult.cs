using Data.Models;
using DTOs.Request.UserDTOs;

namespace DTOs.Responses
{
    public class LoginResult
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }

        public UserRequest? UserRequest { get; set; }

        public static LoginResult LoginSuccess(string accessToken, string refreshToken, UserRequest userRequest)
        {
            return new LoginResult { AccessToken = accessToken, RefreshToken = refreshToken, UserRequest = userRequest};
        }
    }
}
