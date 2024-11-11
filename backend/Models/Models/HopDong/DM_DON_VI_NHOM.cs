using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_DON_VI_NHOM")]
    public class DM_DON_VI_NHOM
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [MaxLength(200)]
        [Column("TEN_NHOM_DV")]
        public string? TEN_NHOM_DV { get; set; }

        [MaxLength(500)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [Column("LOAI_NHOM_DV")]
        public int? LOAI_NHOM_DV { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [MaxLength(1)]
        [Column("IS_HIEU_LUC")]
        public string? IS_HIEU_LUC { get; set; }

        [MaxLength(50)]
        [Column("DV_DUOC_CHIA_SE")]
        public string? DV_DUOC_CHIA_SE { get; set; }
    }
}
