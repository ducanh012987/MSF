using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Role_Menu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }

        [Required]
        public int MenuId { get; set; }
        [ForeignKey("MenuId")]
        public Menu? Menu { get; set; }
    }
}
