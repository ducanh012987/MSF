using Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DTOs.Request.UserDTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Fullname { get; set; }
        public string? Email { get; set; }
        public bool Locked { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }

        /*public static UserDto CreateUserDto(string username, string fullname, string email, bool locked, int roleId)
        {
            return new UserDto
            {
                Username = username,
                Fullname = fullname,
                Email = email,
                Locked = locked,
                RoleId = roleId
            };
        }*/
    }
}
