using Data.DbContexts;
using Data.Models;
using System.Diagnostics;

namespace WebApp_API.Middlewares
{
    public class ActivityLoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ActivityLoggerMiddleware> _logger;
        private readonly IServiceProvider _serviceProvider;

        public ActivityLoggerMiddleware(RequestDelegate next, ILogger<ActivityLoggerMiddleware> logger, IServiceProvider serviceProvider)
        {
            _next = next;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var watch = Stopwatch.StartNew();
            var url = context.Request.Path;
            var method = context.Request.Method;
            var clientIpAddress = context.Connection.RemoteIpAddress?.ToString();
            var clientName = context.Request.Headers["User-Agent"].ToString();
            var userName = context.User.FindFirst("name")?.Value ?? "Anonymous"; // Lấy username nếu có

            //foreach (var claim in context.User.Claims)
            //{
            //    System.Diagnostics.Debug.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            //}
            context.Response.OnStarting(() =>
            {
                watch.Stop();
                var duration = (int)watch.ElapsedMilliseconds; //Thời gian xử lý request
                var statusCode = context.Response.StatusCode;
                var exceptions = "";

                return CreateLog(statusCode, method, url, clientIpAddress!, clientName, exceptions, userName, duration);
            });
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private async Task CreateLog(int statusCode, string method, string url, string clientIpAddress, string clientName, string exceptions, string userName, int duration)
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<WebAppApiDbContext>();
            var log = new ActivityLogs
            {
                StatusCode = statusCode,
                Url = url,
                Method = method,
                ClientIpAddress = clientIpAddress,
                ClientName = clientName,
                Exceptions = exceptions,
                Username = userName,
                Time = DateTime.Now,
                Duration = duration
            };
            await dbContext.ActivityLogs.AddAsync(log);
            await dbContext.SaveChangesAsync();
        }
    }
}
