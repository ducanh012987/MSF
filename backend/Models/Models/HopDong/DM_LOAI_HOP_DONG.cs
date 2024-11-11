using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_LOAI_HOP_DONG")]
    public class DM_LOAI_HOP_DONG
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [MaxLength(255)]
        [Column("TEN_LOAI_HOP_DONG")]
        public string? TEN_LOAI_HOP_DONG { get; set; }

        [MaxLength(50)]
        [Column("DV_DUOC_CHIA_SE")]
        public string? DV_DUOC_CHIA_SE { get; set; }

        [MaxLength(1)]
        [Column("HIEU_LUC")]
        public string? HIEU_LUC { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGUOI_TAO")]
        public int? NGUOI_TAO { get; set; }

        [Column("NGAY_CAP_NHAP")]
        public DateTime? NGAY_CAP_NHAP { get; set; }

        [Column("NGUOI_CAP_NHAP")]
        public int? NGUOI_CAP_NHAP { get; set; }

        [MaxLength(50)]
        [Column("APP_CODE")]
        public string? APP_CODE { get; set; }
    }
}
