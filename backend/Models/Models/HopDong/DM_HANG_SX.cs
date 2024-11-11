using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_HANG_SX")]
    public class DM_HANG_SX
    {
        [Key]
        [Column("ID")]
        public short ID { get; set; }

        [Required]
        [MaxLength(250)]
        [Column("TEN_HANG")]
        public string? TEN_HANG { get; set; }

        [Required]
        [Column("UNIT_ID")]
        public int UNIT_ID { get; set; }

        [Required]
        [MaxLength(1)]
        [Column("HIEU_LUC")]
        public string? HIEU_LUC { get; set; }

        [MaxLength(255)]
        [Column("DIA_CHI")]
        public string? DIA_CHI { get; set; }
    }
}
