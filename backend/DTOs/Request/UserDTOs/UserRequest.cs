using DTOs.Request.RoleDTOs;
using Newtonsoft.Json;

namespace DTOs.Request.UserDTOs
{
    public class UserRequest
    {
        public string? Username { get; set; }
        public string? Fullname { get; set; }
        public string? Email { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public string? Roles { get; set; } // Dữ liệu JSON

        public List<RoleRequest>? ListRoles
        {
            get => string.IsNullOrEmpty(Roles) ? null : JsonConvert.DeserializeObject<List<RoleRequest>>(Roles!);
        }

        public static UserRequest FromUserDto(UserDto user)
        {
            return new UserRequest
            {
                Username = user.Username,
                Fullname = user.Fullname,
                Email = user.Email,
                Roles = user.Roles
            };
        }
    }
}
