using Microsoft.AspNetCore.Authorization;

namespace WebApp_API.Authorization
{
    public class AuthorizePermissionAttribute : AuthorizeAttribute
    {
        public string Permissions { get; }

        public AuthorizePermissionAttribute(string permissions)
        {
            Permissions = permissions;
        }
    }
}
