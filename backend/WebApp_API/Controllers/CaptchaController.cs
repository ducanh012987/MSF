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
            using var bitmap = new Bitmap(140, 40);
            using (var graphics = Graphics.FromImage(bitmap))
            {
                graphics.Clear(Color.White);

                var random = new Random();

                // Thêm nhiễu ảnh
                using (var pen = new Pen(Color.LightGray, 1))
                {
                    for (int i = 0; i < 100; i++)
                    {
                        int x1 = random.Next(bitmap.Width);
                        int y1 = random.Next(bitmap.Height);
                        int x2 = random.Next(bitmap.Width);
                        int y2 = random.Next(bitmap.Height);
                        graphics.DrawLine(pen, x1, y1, x2, y2);
                    }
                }

                // Biến dạng chữ số/chữ cái
                using (var font = new Font("Ink Free", 22, FontStyle.Bold | FontStyle.Italic))
                {
                    //graphics.TranslateTransform(10, 10);
                    graphics.RotateTransform(random.Next(-5, 0));
                    graphics.DrawString(text, font, new SolidBrush(Color.FromArgb(150, 0, 0, 0)), 10, 10);
                }

                // Thêm lớp che phủ
                using (var brush = new SolidBrush(Color.FromArgb(100, Color.LightGray)))
                {
                    graphics.FillRectangle(brush, 0, 0, bitmap.Width, bitmap.Height);
                }

                using (var memoryStream = new MemoryStream())
                {
                    bitmap.Save(memoryStream, ImageFormat.Png);
                    return memoryStream.ToArray();
                }
            }
        }

        public class CaptchaValidationRequest
        {
            [Required(ErrorMessage = "Captcha không được để trống")]
            [MaxLength(6, ErrorMessage = "Captcha không được quá 6 ký tự")]
            public string? Captcha { get; set; }
        }
    }
}