using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.MenuDTOs
{
    public class MenuInput
    {
        [Required(ErrorMessage = "Tên hiển thị không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên hiển thị không được quá 50 ký tự")]
        public string? DisplayName { get; set; }

        [Required(ErrorMessage = "Đường dẫn không được để trống")]
        [MaxLength(200, ErrorMessage = "Đường dẫn không được quá 200 ký tự")]
        public string? Url { get; set; }

        [MaxLength(200, ErrorMessage = "Icon không được quá 200 ký tự")]
        public string? Icon { get; set; }

        [Required(ErrorMessage = "Trạng thái không được để trống")]
        public bool Status { get; set; }
    }
}
