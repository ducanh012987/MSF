using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.PermissionDTOs
{
    public class PermissionInput
    {
        [Required(ErrorMessage = "Tên quyền không được để trống !")]
        [MaxLength(50, ErrorMessage = "Tên quyền không được quá 50 ký tự !")]
        [RegularExpression(@"^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$", ErrorMessage = "Tên phải phân tách bằng dấu chấm (GroupName.Action)")]
        [DefaultValue("GroupName.Action")]
        public string PermissionName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tên hiển thị không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên hiển thị không được quá 50 ký tự")]
        public string? DisplayName { get; set; }

        [Required(ErrorMessage = "Trạng thái không được để trống")]
        public bool Status { get; set; }
    }
}
