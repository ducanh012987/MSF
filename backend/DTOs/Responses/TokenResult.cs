using System.ComponentModel.DataAnnotations;

namespace DTOs.Responses
{
    public class TokenResult
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }
}
