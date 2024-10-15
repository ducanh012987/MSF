using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.PermissionDTOs
{
    public class PermissionInput
    {
        [Required(ErrorMessage = "Tên hiển thị không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên hiển thị không được quá 50 ký tự")]
        public string? PermissionName { get; set; }

        [Required(ErrorMessage = "Trạng thái không được để trống")]
        public bool Status { get; set; }
    }
}
