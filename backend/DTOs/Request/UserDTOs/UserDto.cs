using Data.Models;
using DTOs.Request.RoleDTOs;
using Newtonsoft.Json;

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

        [System.Text.Json.Serialization.JsonIgnore]
        public string? Roles { get; set; } // Dữ liệu JSON

        public List<RoleRequest>? ListRoles
        {
            get => string.IsNullOrEmpty(Roles) ? null : JsonConvert.DeserializeObject<List<RoleRequest>>(Roles!);
        }
    }
}
