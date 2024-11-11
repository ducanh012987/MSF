using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("DM_LOAI_HH")]
    public class DM_LOAI_HH
    {
        [Key]
        [Column("ID_LOAI_HH")]
        public int ID_LOAI_HH { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("TEN_LOAI_HH")]
        public string? TEN_LOAI_HH { get; set; }

        [MaxLength(1000)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [Required]
        [MaxLength(1)]
        [Column("HIEU_LUC")]
        public string? HIEU_LUC { get; set; }

        [MaxLength(50)]
        [Column("APP_CODE")]
        public string? APP_CODE { get; set; }

        [Column("ID_LOAI_HH_CHA")]
        public int? ID_LOAI_HH_CHA { get; set; }

        [MaxLength(255)]
        [Column("ID_LOAI_HH_CHA_LIST")]
        public string? ID_LOAI_HH_CHA_LIST { get; set; }

        [MaxLength(255)]
        [Column("PARENT_TEXT")]
        public string? PARENT_TEXT { get; set; }

        [Required]
        [Column("CURR_LEVEL")]
        public int CURR_LEVEL { get; set; }

        [Column("ID_NHOM_HH")]
        public int? ID_NHOM_HH { get; set; }

        [MaxLength(50)]
        [Column("MA_LOAI_HH")]
        public string? MA_LOAI_HH { get; set; }

        [Column("CAP_DV_SU_DUNG")]
        public short? CAP_DV_SU_DUNG { get; set; }

        [MaxLength(1)]
        [Column("IS_XE_MAY")]
        public string? IS_XE_MAY { get; set; }

        [MaxLength(1)]
        [Column("IS_OTO")]
        public string? IS_OTO { get; set; }

        [Column("ORDER_BY")]
        public short? ORDER_BY { get; set; }
    }
}
