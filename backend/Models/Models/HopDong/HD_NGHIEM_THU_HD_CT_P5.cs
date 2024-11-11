using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("HD_NGHIEM_THU_HD_CT_P5")]
    public class HD_NGHIEM_THU_HD_CT_P5
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID_NT_CT")]
        public long ID_NT_CT { get; set; }

        [Required]
        [Column("ID_TXN")]
        public long ID_TXN { get; set; }

        [Column("STT")]
        public short? STT { get; set; }

        [Required]
        [Column("ID_HANG")]
        public int ID_HANG { get; set; }

        [MaxLength(30)]
        [Column("MA_HANG")]
        public string? MA_HANG { get; set; }

        [MaxLength(150)]
        [Column("TEN_HANG")]
        public string? TEN_HANG { get; set; }

        [MaxLength(50)]
        [Column("DVT")]
        public string? DVT { get; set; }

        [MaxLength(50)]
        [Column("SO_LO")]
        public string? SO_LO { get; set; }

        [Column("SERIAL", TypeName = "nvarchar(max)")]
        public string? SERIAL { get; set; }

        [Column("SO_LUONG", TypeName = "decimal(18, 0)")]
        public decimal? SO_LUONG { get; set; }

        [Column("DON_GIA", TypeName = "decimal(18, 2)")]
        public decimal? DON_GIA { get; set; }

        [Column("THANH_TIEN", TypeName = "decimal(18, 2)")]
        public decimal? THANH_TIEN { get; set; }

        [MaxLength(150)]
        [Column("MODEL")]
        public string? MODEL { get; set; }

        [Column("NAM_SX")]
        public short? NAM_SX { get; set; }

        [Column("NGUON_KP")]
        public int? NGUON_KP { get; set; }

        [Column("XUAT_XU_ID")]
        public short? XUAT_XU_ID { get; set; }

        [Column("HANG_SX_ID")]
        public short? HANG_SX_ID { get; set; }

        [MaxLength(8)]
        [Column("NGAY_HET_HAN")]
        public string? NGAY_HET_HAN { get; set; }

        [MaxLength(255)]
        [Column("CHUNG_LOAI")]
        public string? CHUNG_LOAI { get; set; }

        [MaxLength(250)]
        [Column("TEN_NHOM_HH")]
        public string? TEN_NHOM_HH { get; set; }
    }
}
