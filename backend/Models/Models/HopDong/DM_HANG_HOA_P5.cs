using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace Data.Models.HopDong
{
    [Table("DM_HANG_HOA_P5")]
    public class DM_HANG_HOA_P5
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public long ID { get; set; }

        [Required]
        [MaxLength(50)]
        [Column("MA_HANG_HOA")]
        public string? MA_HANG_HOA { get; set; }

        [MaxLength(250)]
        [Column("TEN_HANG_HOA")]
        public string? TEN_HANG_HOA { get; set; }

        [MaxLength(500)]
        [Column("MO_TA")]
        public string? MO_TA { get; set; }

        [Column("NHOM_HH_ID")]
        public int? NHOM_HH_ID { get; set; }

        [Column("DVT_ID")]
        public int? DVT_ID { get; set; }

        [Column("NGAY_TAO")]
        public DateTime? NGAY_TAO { get; set; }

        [Column("NGAY_CAP_NHAT")]
        public DateTime? NGAY_CAP_NHAT { get; set; }

        [Column("NGUOI_CAP_NHAT")]
        public int? NGUOI_CAP_NHAT { get; set; }

        [Column("SO_THU_TU")]
        public float? SO_THU_TU { get; set; }

        [Required]
        [MaxLength(1)]
        [Column("IS_HIEU_LUC")]
        public char IS_HIEU_LUC { get; set; }

        [Column("NGAY_HUY")]
        public DateTime? NGAY_HUY { get; set; }

        [MaxLength(1)]
        [Column("SO_SERIAL")]
        public char? SO_SERIAL { get; set; }

        [MaxLength(1)]
        [Column("SO_LO")]
        public char? SO_LO { get; set; }

        [Column("ID_CHUNG_LOAI_HH")]
        public int? ID_CHUNG_LOAI_HH { get; set; }
    }
}
