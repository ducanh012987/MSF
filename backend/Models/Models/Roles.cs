using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Roles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? RoleName { get; set; }

        public bool Status { get; set; }

        public ICollection<User_Roles>? User_Roles { get; set; }
        public ICollection<Role_Permissions>? Role_Permissions { get; set; }
        public ICollection<Role_Menu>? Role_Menu { get; set; }
    }
}
