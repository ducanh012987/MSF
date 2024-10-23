using DTOs.Responses;
using System.Net;

namespace WebApp_API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context); // Tiếp tục middleware pipeline

            // Kiểm tra mã trạng thái sau khi xử lý request
            if (context.Response.StatusCode == 401)
            {
                throw new CustomException(StatusCodes.Status401Unauthorized, "Bạn chưa đăng nhập!");
            }
            else if (context.Response.StatusCode == 403)
            {
                throw new CustomException(StatusCodes.Status403Forbidden, "Bạn không có quyền truy cập!");
            }
        }
    }
}
