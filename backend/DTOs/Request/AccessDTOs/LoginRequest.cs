using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.AccessDTOs
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Tên đăng nhập không được để trống")]
        [MaxLength(50, ErrorMessage = "Tên đăng nhập không được quá 50 ký tự")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [MaxLength(20, ErrorMessage = "Mật khẩu không được quá 20 ký tự")]
        public string? Password { get; set; }
    }
}
