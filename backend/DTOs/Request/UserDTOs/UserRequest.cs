using Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DTOs.Request.UserDTOs
{
    public class UserRequest
    {
        public string? Username { get; set; }
        public string? Fullname { get; set; }
        public string? Email { get; set; }

        public int RoleId { get; set; }

        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }

        public static UserRequest FromUserDto(UserDto user)
        {
            return new UserRequest
            {
                Username = user.Username,
                Fullname = user.Fullname,
                Email = user.Email,
                RoleId = user.RoleId,
                Roles = user.Roles!
            };
        }
    }
}
