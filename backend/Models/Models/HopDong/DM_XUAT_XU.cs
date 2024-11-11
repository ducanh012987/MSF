using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_XUAT_XU")]
    public class DM_XUAT_XU
    {
        [Key]
        [Column("ID")]
        public short ID { get; set; }

        [Required]
        [MaxLength(250)]
        [Column("XUAT_XU")]
        public string? XUAT_XU { get; set; }

        [MaxLength(50)]
        [Column("DV_DUOC_CHIA_SE")]
        public string? DV_DUOC_CHIA_SE { get; set; }

        [Required]
        [MaxLength(1)]
        [Column("HIEU_LUC")]
        public string? HIEU_LUC { get; set; }
    }
}
