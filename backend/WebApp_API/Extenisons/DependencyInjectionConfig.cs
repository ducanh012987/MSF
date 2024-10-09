﻿using Business.Repository;
using Business.Services;
using Data.Models;
using DTOs.Responses;
using DTOs;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace WebApp_API.Extenisons
{
    public static class DependencyInjectionConfig
    {
        public static void AddCustomServices(this IServiceCollection services, string connectionString)
        {
            // Đăng ký ResponseObject cho LoginResult
            services.AddTransient<ResponseObject<LoginResult>>(provider =>
            {
                return new ResponseObject<LoginResult>();
            });

            // Đăng ký IUserRepository với UserService
            services.AddTransient<IUserRepository, UserService>(provider =>
            {
                var responseObject = provider.GetRequiredService<ResponseObject<LoginResult>>();
                var tokenRepository = provider.GetRequiredService<ITokenRepository>();
                var roleRepository = provider.GetRequiredService<IRoleRepository>();
                return new UserService(connectionString, responseObject, tokenRepository, roleRepository);
            });

            // Đăng ký ResponseObject cho Roles
            services.AddTransient<ResponseObject<Roles>>(provider =>
            {
                return new ResponseObject<Roles>();
            });

            // Đăng ký IRoleRepository với RoleService
            services.AddTransient<IRoleRepository, RoleService>(provider =>
            {
                var responseObject = provider.GetRequiredService<ResponseObject<Roles>>();
                return new RoleService(connectionString, responseObject);
            });

            // Đăng ký ITokenRepository với TokenService
            services.AddTransient<ITokenRepository, TokenService>(provider =>
            {
                var jwtSettings = provider.GetRequiredService<IOptionsMonitor<JwtSettings>>();
                var httpContextAccessor = provider.GetRequiredService<IHttpContextAccessor>();
                var serviceProvider = provider.GetRequiredService<IServiceProvider>();
                return new TokenService(connectionString, jwtSettings, httpContextAccessor, serviceProvider);
            });

            // Đăng ký ILogRepository với LogService
            services.AddTransient<ILogRepository, LogService>(provider =>
            {
                return new LogService(connectionString);
            });
        }

        public static void AddSwaggerServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                /*options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });*/

                // Chỉ thêm yêu cầu bảo mật cho các API có thuộc tính [Authorize]
                options.OperationFilter<AuthorizeCheckOperationFilter>();
            });
        }

        public class AuthorizeCheckOperationFilter : IOperationFilter
        {
            public void Apply(OpenApiOperation operation, OperationFilterContext context)
            {
                // Kiểm tra xem controller hoặc action có thuộc tính [Authorize] hay không
                var hasAuthorize = context.MethodInfo.DeclaringType!
                    .GetCustomAttributes(true)
                    .OfType<AuthorizeAttribute>()
                    .Any() || context.MethodInfo
                    .GetCustomAttributes(true)
                    .OfType<AuthorizeAttribute>()
                    .Any();

                if (hasAuthorize)
                {
                    operation.Security.Add(new OpenApiSecurityRequirement
                    {
                        { new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            Array.Empty<string>() }
                    });
                }
            }
        }

        public static void AddJwtServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Cấu hình dịch vụ JWT từ appsettings.json
            services.Configure<JwtSettings>(configuration.GetSection("Jwt"));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var jwtSettings = configuration.GetSection("Jwt").Get<JwtSettings>();

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtSettings!.Issuer,
                        ValidAudience = jwtSettings.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key))
                    };

                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Headers["Authorization"].FirstOrDefault();
                            return Task.CompletedTask;
                        }
                    };
                });
        }

        public static void AddAuthorizationServices(this IServiceCollection services)
        {
            // Cấu hình Authorization
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminPolicy", policy =>
                    policy.RequireRole("ADMIN"));
                options.AddPolicy("UserPolicy", policy =>
                    policy.RequireRole("USER"));
            });
        }
    }
}
