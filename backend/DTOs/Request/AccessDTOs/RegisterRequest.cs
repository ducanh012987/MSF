using System.ComponentModel.DataAnnotations;

namespace DTOs.Request.AccessDTOs
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Tên đăng nhập không được để trống")]
        [MaxLength(20, ErrorMessage = "Tên đăng nhập không được quá 20 ký tự")]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        [MaxLength(20, ErrorMessage = "Mật khẩu không được quá 20 ký tự")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$",
            ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái viết hoa, chữ cái viết thường và chữ số")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "Họ tên không được để trống")]
        [MaxLength(100, ErrorMessage = "Họ tên không được quá 100 ký tự")]
        public string? Fullname { get; set; }

        [Required(ErrorMessage = "Email không được để trống")]
        [MaxLength(50, ErrorMessage = "Email không được quá 50 ký tự")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string? Email { get; set; }
    }
}
