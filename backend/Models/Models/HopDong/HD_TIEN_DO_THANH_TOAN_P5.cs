using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("HD_TIEN_DO_THANH_TOAN_P5")]
    public class HD_TIEN_DO_THANH_TOAN_P5
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public long ID { get; set; }

        [Required]
        [Column("ID_HOP_DONG")]
        public long ID_HOP_DONG { get; set; }

        [MaxLength(8)]
        [Column("NGAY_DE_XUAT")]
        public string? NGAY_DE_XUAT { get; set; }

        [Column("SO_TIEN_DE_XUAT", TypeName = "decimal(18, 2)")]
        public decimal? SO_TIEN_DE_XUAT { get; set; }

        [Required]
        [Column("NGAY_THANH_TOAN")]
        public DateTime NGAY_THANH_TOAN { get; set; }

        [Required]
        [Column("SO_TIEN", TypeName = "decimal(18, 2)")]
        public decimal SO_TIEN { get; set; }

        [Column("TIEN_DO_TT")]
        public float? TIEN_DO_TT { get; set; }

        [MaxLength(250)]
        [Column("GHI_CHU")]
        public string? GHI_CHU { get; set; }

        [Required]
        [Column("NGAY_TAO")]
        public DateTime NGAY_TAO { get; set; }

        [Required]
        [Column("NGUOI_TAO")]
        public int NGUOI_TAO { get; set; }
    }
}
