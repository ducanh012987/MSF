using DTOs.Request.MenuDTOs;
using DTOs.Request.PermissionDTOs;
using Newtonsoft.Json;

namespace DTOs.Request.RoleDTOs
{
    public class RoleDTO
    {
        public int Id { get; set; }
        public string? RoleName { get; set; }
        public bool Status { get; set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public string? Permissions { get; set; } // Dữ liệu JSON
        [System.Text.Json.Serialization.JsonIgnore]
        public string? Menu { get; set; } // Dữ liệu JSON

        public List<PermissionDTO>? ListPermissions
        {
            get => string.IsNullOrEmpty(Permissions) ? null : JsonConvert.DeserializeObject<List<PermissionDTO>>(Permissions!);
        }

        public List<MenuDTO>? ListMenu
        {
            get => string.IsNullOrEmpty(Menu) ? null : JsonConvert.DeserializeObject<List<MenuDTO>>(Menu!);
        }
    }
}
