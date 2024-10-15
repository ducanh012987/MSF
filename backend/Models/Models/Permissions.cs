using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Permissions
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? PermissionName { get; set; }

        public bool Status { get; set; }

        public ICollection<Role_Permissions>? Role_Permissions { get; set; }
    }
}
