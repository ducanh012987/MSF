using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Menu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? DisplayName { get; set; }

        [Required]
        [MaxLength(200)]
        public string? Url { get; set; }

        [MaxLength(200)]
        public string? Icon { get; set; }

        public bool Status { get; set; }

        public ICollection<Role_Menu>? Role_Menu { get; set; }
    }
}
