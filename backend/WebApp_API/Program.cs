﻿using Data.DbContexts;
using Microsoft.EntityFrameworkCore;
using WebApp_API.Middlewares;
using WebApp_API.Extenisons;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Đọc chuỗi kết nối từ appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' is not found.");
}

// Cấu hình DbContext
builder.Services.AddDbContext<WebAppApiDbContext>(options =>
                    options.UseSqlServer(connectionString));

// Cấu hình các services
builder.Services.AddCustomServices(connectionString);

// Cấu hình dịch vụ JWT từ appsettings.json
builder.Services.AddJwtServices(builder.Configuration);

// Cấu hình Authorization
builder.Services.AddAuthorizationServices();

// Cấu hình Swagger
builder.Services.AddSwaggerServices();

//Cấu hình Http
builder.Services.AddHttpClient();
builder.Services.AddHttpContextAccessor();

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors("AllowAngularApp");

// Đăng ký middleware trả lỗi 401, 403
app.UseMiddleware<ErrorHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Bỏ qua active log cho Swagger
app.UseWhen(context => !context.Request.Path.StartsWithSegments("/swagger") &&
                        !context.Request.Path.StartsWithSegments("/api/Log") &&
                        !context.Request.Path.StartsWithSegments("/api/Captcha"), appBuilder =>
{
    appBuilder.UseMiddleware<ActivityLoggerMiddleware>();
});

app.MapControllers();

app.Run();
