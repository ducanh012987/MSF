namespace DTOs.Request.PermissionDTOs
{
    public class PermissionDTO
    {
        public int Id { get; set; }
        public string? PermissionName { get; set; }
        public string? DisplayName { get; set; }
        public string? GroupName { get; set; }
        public bool Status { get; set; }
    }
}
