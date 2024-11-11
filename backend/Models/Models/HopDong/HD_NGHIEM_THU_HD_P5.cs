using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("HD_NGHIEM_THU_HD_P5")]
    public class HD_NGHIEM_THU_HD_P5
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID_TXN")]
        public long ID_TXN { get; set; }

        [Column("ID_HOP_DONG")]
        public long? ID_HOP_DONG { get; set; }

        [MaxLength(1)]
        [Column("IS_PHU_LUC")]
        public string? IS_PHU_LUC { get; set; }

        [Column("ID_HOP_DONG_CHA")]
        public long? ID_HOP_DONG_CHA { get; set; }

        [Column("ID_DON_VI_QL")]
        public int? ID_DON_VI_QL { get; set; }

        [MaxLength(8)]
        [Column("NGAY_CT")]
        public string? NGAY_CT { get; set; }

        [Column("NGUOI_TAO")]
        public int? NGUOI_TAO { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [MaxLength(150)]
        [Column("NGUOI_NGHIEM_THU")]
        public string? NGUOI_NGHIEM_THU { get; set; }

        [MaxLength(500)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [Column("TRANG_THAI")]
        public int? TRANG_THAI { get; set; }

        [Column("FILE_PATH", TypeName = "nvarchar(max)")]
        public string? FILE_PATH { get; set; }
    }
}
