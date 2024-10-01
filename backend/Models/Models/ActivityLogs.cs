using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Models
{
    public class ActivityLogs
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int StatusCode { get; set; }

        [Required]
        [MaxLength(10)]
        public string? Method { get; set; }

        [Required]
        [MaxLength(256)]
        public string? Url { get; set; }

        [Required]
        [MaxLength(15)]
        public string? ClientIpAddress { get; set; }

        [MaxLength(256)]
        public string? ClientName { get; set; }

        [MaxLength(256)]
        public string? Exceptions { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Username { get; set; }

        [Required]
        public DateTime Time { get; set; }

        [Required]
        public int Duration { get; set; }

    }
}
