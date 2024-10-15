namespace DTOs.Request.MenuDTOs
{
    public class MenuDTO
    {
        public int Id { get; set; }
        public string? DisplayName { get; set; }
        public string? Url { get; set; }
        public string? Icon { get; set; }
        public bool Status { get; set; }
    }
}
