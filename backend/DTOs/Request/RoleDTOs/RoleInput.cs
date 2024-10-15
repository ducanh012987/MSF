using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.RoleDTOs
{
    public class RoleInput
    {
        [Required(ErrorMessage = "Tên Role không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên Role không được quá 50 ký tự")]
        public string? RoleName { get; set; }

        [Required(ErrorMessage = "Trạng thái không được để trống")]
        public bool Status { get; set; }

        [Required(ErrorMessage = "PermissionIds không được để trống")]
        public List<int>? PermissionIds { get; set; }

        [Required(ErrorMessage = "MenuIds không được để trống")]
        public List<int>? MenuIds { get; set; }
    }
}
