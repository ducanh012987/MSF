using Microsoft.AspNetCore.Authorization;

namespace WebApp_API.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public string Permissions { get; }

        public PermissionRequirement(string permissions)
        {
            Permissions = permissions;
        }
    }
}
