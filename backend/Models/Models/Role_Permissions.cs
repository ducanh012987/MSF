using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Role_Permissions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }

        [Required]
        public int PermissionId { get; set; }
        [ForeignKey("PermissionId")]
        public Permissions? Permissions { get; set; }
    }
}
