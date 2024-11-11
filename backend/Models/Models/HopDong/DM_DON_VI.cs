using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_DON_VI")]
    public class DM_DON_VI
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public int ID { get; set; }

        [Required]
        [MaxLength(200)]
        [Column("TEN_DON_VI")]
        public string? TEN_DON_VI { get; set; }

        [MaxLength(1000)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [MaxLength(50)]
        [Column("PHIEN_HIEU")]
        public string? PHIEN_HIEU { get; set; }

        [Column("NHOM_DON_VI_ID")]
        public int? NHOM_DON_VI_ID { get; set; }

        [Column("DON_VI_CHA_ID")]
        public int? DON_VI_CHA_ID { get; set; }

        [Column("KHU_VUC_ID")]
        public int? KHU_VUC_ID { get; set; }

        [MaxLength(1)]
        [Column("IS_QUAN_LY_KHO")]
        public string? IS_QUAN_LY_KHO { get; set; }

        [MaxLength(250)]
        [Column("CONTACT_NAME")]
        public string? CONTACT_NAME { get; set; }

        [MaxLength(50)]
        [Column("CONTACT_TEL")]
        public string? CONTACT_TEL { get; set; }

        [MaxLength(50)]
        [Column("CONTACT_ID")]
        public string? CONTACT_ID { get; set; }

        [MaxLength(1000)]
        [Column("CONTACT_ADDRESS")]
        public string? CONTACT_ADDRESS { get; set; }

        [Column("SO_NAM_DAO_TAO")]
        public int? SO_NAM_DAO_TAO { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [MaxLength(1)]
        [Column("IS_DON_VI_SU_DUNG")]
        public string? IS_DON_VI_SU_DUNG { get; set; }

        [MaxLength(200)]
        [Column("PHONG_QUAN_LY")]
        public string? PHONG_QUAN_LY { get; set; }

        [Column("MNG_UNIT_ID")]
        public int? MNG_UNIT_ID { get; set; }

        [MaxLength(1)]
        [Column("IS_DM_CHUNG")]
        public string? IS_DM_CHUNG { get; set; }

        [MaxLength(50)]
        [Column("DV_KHONG_DUNG")]
        public string? DV_KHONG_DUNG { get; set; }

        [MaxLength(50)]
        [Column("DV_DUOC_CHIA_SE")]
        public string? DV_DUOC_CHIA_SE { get; set; }

        [MaxLength(1)]
        [Column("HIEU_LUC")]
        public string? HIEU_LUC { get; set; }

        [MaxLength(10)]
        [Column("NHOM_DV_SU_DUNG")]
        public string? NHOM_DV_SU_DUNG { get; set; }

        [Column("CAP_DV")]
        public int? CAP_DV { get; set; }

        [MaxLength(1)]
        [Column("TRANG_THAI")]
        public string? TRANG_THAI { get; set; }

        [MaxLength(2)]
        [Column("LOAI_KHO")]
        public string? LOAI_KHO { get; set; }

        [Column("PARRET_TEXT", TypeName = "nvarchar(max)")]
        public string? PARRET_TEXT { get; set; }

        [MaxLength(255)]
        [Column("LIST_ID_DON_VI_CHA")]
        public string? LIST_ID_DON_VI_CHA { get; set; }

        [MaxLength(500)]
        [Column("NAM_KINH_PHI")]
        public string? NAM_KINH_PHI { get; set; }
    }
}
