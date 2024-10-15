using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.DbContexts
{
    public class WebAppApiDbContext(DbContextOptions<WebAppApiDbContext> options) : DbContext(options)
    {
        // Định nghĩa các DbSet cho các bảng trong cơ sở dữ liệu
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<User_Roles> User_Roles { get; set; }
        public DbSet<Permissions> Permissions { get; set; }
        public DbSet<Role_Permissions> Role_Permissions { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Role_Menu> Role_Menu { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<ActivityLogs> ActivityLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Cấu hình thêm nếu cần

        }
    }
}
