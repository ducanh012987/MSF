using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class User_Roles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public Users? Users { get; set; }

        [Required]
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Roles? Roles { get; set; }
    }
}
