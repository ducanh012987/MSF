using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.UserDTOs
{
    public class UserInput
    {
        [Required(ErrorMessage = "Tên đăng nhập không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên đăng nhập không được quá 50 ký tự")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Họ tên không được để trống")]
        [MaxLength(100, ErrorMessage = "Họ tên không được quá 100 ký tự")]
        public string? Fullname { get; set; }

        [Required(ErrorMessage = "Email không được để trống")]
        [MaxLength(50, ErrorMessage = "Email không được quá 50 ký tự")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Locked không được để trống")]
        public bool Locked { get; set; }

        [Required(ErrorMessage = "RoleIds không được để trống")]
        public List<int>? RoleIds { get; set; }
    }
}
