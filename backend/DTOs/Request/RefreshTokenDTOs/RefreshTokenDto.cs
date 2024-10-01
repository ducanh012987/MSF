using Data.Models;
using System.ComponentModel.DataAnnotations.Schema;
namespace DTOs.Request.RefreshTokenDTOs
{
    public class RefreshTokenDto
    {
        public int Id { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime TimeExpired { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users? User { get; set; }
    }
}
