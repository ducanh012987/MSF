using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Drawing;
using System.Drawing.Imaging;

namespace WebApp_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CaptchaController : ControllerBase
    {
        private static readonly Dictionary<string, string> Captchas = new Dictionary<string, string>(); 

        [HttpGet("GenerateCaptcha")]
        public IActionResult GenerateCaptcha()
        {
            var captchaText = GenerateRandomText(); // Tạo văn bản CAPTCHA ngẫu nhiên
            var captchaImage = GenerateCaptchaImage(captchaText); // Tạo hình ảnh CAPTCHA

            //var captchaId = Guid.NewGuid().ToString();
            //Captchas[captchaId] = captchaText;

            var captchaId = "id";
            Captchas[captchaId] = captchaText;

            return File(captchaImage, "image/png");
        }

        [HttpPost("ValidateCaptcha")]
        public IActionResult ValidateCaptcha([FromBody] CaptchaValidationRequest request)
        {
            var captchaText = request.Captcha;
            // Kiểm tra mã CAPTCHA
            var isValid = Captchas.ContainsValue(captchaText!);
            return Ok(new { success = isValid });
        }
        
        // Hàm tạo mã Captcha
        private string GenerateRandomText()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // Hàm tạo hình ảnh Captcha
        private byte[] GenerateCaptchaImage(string text)
        {
            using var bitmap = new Bitmap(130, 40);
            using var graphics = Graphics.FromImage(bitmap);
            graphics.Clear(Color.White);
            graphics.DrawString(text, new Font("Arial", 18), Brushes.Black, new PointF(10, 10));

            using var memoryStream = new MemoryStream();
            bitmap.Save(memoryStream, ImageFormat.Png);
            return memoryStream.ToArray();
        }

        public class CaptchaValidationRequest
        {
            [Required(ErrorMessage = "Captcha không được để trống")]
            [MaxLength(6, ErrorMessage = "Captcha không được quá 6 ký tự")]
            public string? Captcha { get; set; }
        }
    }
}