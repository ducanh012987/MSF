using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Username { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Password { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Fullname { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Email { get; set; }

        public bool Locked { get; set; }

        public ICollection<User_Roles>? User_Roles { get; set; }
    }
}
