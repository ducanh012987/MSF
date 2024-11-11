using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Data.Models.HopDong
{
    [Table("HD_HH_NGHIEM_THU_KD_P5")]
    public class HD_HH_NGHIEM_THU_KD_P5
    {
        [Key, Column("ID_HOP_DONG", Order = 0)]
        public long ID_HOP_DONG { get; set; }

        [Key, Column("ID_HANG", Order = 1)]
        public int ID_HANG { get; set; }

        [Required]
        [Column("SO_LUONG_NT")]
        public int SO_LUONG_NT { get; set; }

        [Required]
        [Column("SO_LUONG_GT")]
        public int SO_LUONG_GT { get; set; }

        [Required]
        [Column("SO_LUONG_NK")]
        public int SO_LUONG_NK { get; set; }

        [Required]
        [Column("SO_LUONG_KT")]
        public int SO_LUONG_KT { get; set; }
    }
}
