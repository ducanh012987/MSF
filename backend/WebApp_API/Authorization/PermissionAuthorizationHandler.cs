using Business.Repository;
using DTOs.Request.RoleDTOs;
using DTOs.Responses;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Security.Claims;

namespace WebApp_API.Authorization
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        private readonly IPermissionRepository _permissionRepository;

        public PermissionAuthorizationHandler(IPermissionRepository permissionRepository) 
        { 
            _permissionRepository = permissionRepository;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.Resource is HttpContext httpContext)
            {
                // Lấy endpoint hiện tại
                var endpoint = httpContext.GetEndpoint();

                var authorizePermissionAttribute = endpoint!.Metadata.GetMetadata<AuthorizePermissionAttribute>();
                if (authorizePermissionAttribute != null)
                {
                    var requiredPermission = authorizePermissionAttribute!.Permissions;

                    // Lấy thông tin vai trò từ token
                    var rolesClaim = context.User.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value)
                        .ToList();

                    bool isPermission = false;

                    // Kiểm tra từng vai trò của người dùng xem có quyền không
                    foreach (var roleToken in rolesClaim)
                    {
                        var authorizePermission = await _permissionRepository.CheckRolePermission(int.Parse(roleToken), requiredPermission);

                        if (authorizePermission)
                        {
                            isPermission = true;
                            break;
                        }
                    }

                    if (isPermission)
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        context.Fail(); // Người dùng không có quyền
                    }
                }
                else
                {
                    context.Succeed(requirement); // Nếu không có yêu cầu quyền, cho phép mặc định
                }

            }
        }
    }
}
