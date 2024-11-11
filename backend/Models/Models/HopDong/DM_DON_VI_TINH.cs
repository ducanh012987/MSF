using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_DON_VI_TINH")]
    public class DM_DON_VI_TINH
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [MaxLength(200)]
        [Column("TEN_DVT")]
        public string? TEN_DVT { get; set; }

        [MaxLength(500)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [MaxLength(50)]
        [Column("DV_DUOC_CHIA_SE")]
        public string? DV_DUOC_CHIA_SE { get; set; }
    }
}
