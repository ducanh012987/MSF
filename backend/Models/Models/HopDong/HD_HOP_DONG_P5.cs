using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("HD_HOP_DONG_P5")]
    public class HD_HOP_DONG_P5
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID_HOP_DONG")]
        public long ID_HOP_DONG { get; set; }

        [MaxLength(50)]
        [Column("SO_HD")]
        public string? SO_HD { get; set; }

        [MaxLength(200)]
        [Column("TEN_HD")]
        public string? TEN_HD { get; set; }

        [MaxLength(500)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [MaxLength(8)]
        [Column("NGAY_KY")]
        public string? NGAY_KY { get; set; }

        [Column("LOAI_HD")]
        public int? LOAI_HD { get; set; }

        [Column("ID_CONG_TY")]
        public int? ID_CONG_TY { get; set; }

        [MaxLength(200)]
        [Column("TEN_CONG_TY")]
        public string? TEN_CONG_TY { get; set; }

        [MaxLength(100)]
        [Column("TEN_VIET_TAT")]
        public string? TEN_VIET_TAT { get; set; }

        [Column("ID_NGUON_GOC")]
        public int? ID_NGUON_GOC { get; set; }

        [MaxLength(50)]
        [Column("NGUON_KP")]
        public string? NGUON_KP { get; set; }

        [Column("GIA_TRI_HD", TypeName = "decimal(18, 2)")]
        public decimal? GIA_TRI_HD { get; set; }

        [Column("GIA_TRI_THUC_TE", TypeName = "decimal(18, 2)")]
        public decimal? GIA_TRI_THUC_TE { get; set; }

        [Column("GT_DA_THANH_TOAN", TypeName = "decimal(18, 2)")]
        public decimal? GT_DA_THANH_TOAN { get; set; }

        [MaxLength(8)]
        [Column("NGAY_THANH_LY_DK")]
        public string? NGAY_THANH_LY_DK { get; set; }

        [Column("SO_NGAY_TH")]
        public int? SO_NGAY_TH { get; set; }

        [MaxLength(8)]
        [Column("NGAY_THANH_LY_TT")]
        public string? NGAY_THANH_LY_TT { get; set; }

        [MaxLength(1)]
        [Column("TRANG_THAI")]
        public string? TRANG_THAI { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGUOI_TAO")]
        public int? NGUOI_TAO { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [Column("NGUOI_PHU_TRACH")]
        public int? NGUOI_PHU_TRACH { get; set; }

        [MaxLength(8)]
        [Column("NGAY_CHOT_HD")]
        public string? NGAY_CHOT_HD { get; set; }

        [Column("NAM_KP")]
        public int? NAM_KP { get; set; }

        [MaxLength(1)]
        [Column("IS_PHU_LUC")]
        public string? IS_PHU_LUC { get; set; }

        [Column("ID_HOP_DONG_CHA")]
        public long? ID_HOP_DONG_CHA { get; set; }

        [Column("ID_DON_VI_QL")]
        public int? ID_DON_VI_QL { get; set; }

        [MaxLength(30)]
        [Column("ID_DON_VI_XEM")]
        public string? ID_DON_VI_XEM { get; set; }

        [Column("FILE_PATH", TypeName = "nvarchar(max)")]
        public string? FILE_PATH { get; set; }

        [Column("GIA_TRI_THANH_LY", TypeName = "decimal(18, 2)")]
        public decimal? GIA_TRI_THANH_LY { get; set; }

        [MaxLength(500)]
        [Column("THONG_TIN_KHAC")]
        public string? THONG_TIN_KHAC { get; set; }

        [MaxLength(100)]
        [Column("NGUOI_PHU_TRACH_TEN")]
        public string? NGUOI_PHU_TRACH_TEN { get; set; }

        [Column("LANH_DAO_ID")]
        public int? LANH_DAO_ID { get; set; }

        [MaxLength(100)]
        [Column("LANH_DA0_TEN")]
        public string? LANH_DA0_TEN { get; set; }

        [MaxLength(8)]
        [Column("NGAY_CO_HIEU_LUC")]
        public string? NGAY_CO_HIEU_LUC { get; set; }

        [MaxLength(1)]
        [Column("TIEN_DO_HOP_DONG")]
        public string? TIEN_DO_HOP_DONG { get; set; }
    }
}
