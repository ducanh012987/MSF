using System.ComponentModel.DataAnnotations;

namespace DTOs.Responses
{
    public class TokenResult
    {
        [Required(ErrorMessage = "Access Token là trống!")]
        public string? AccessToken { get; set; }
        [Required(ErrorMessage = "Refresh Token là trống!")]
        public string? RefreshToken { get; set; }
    }
}
