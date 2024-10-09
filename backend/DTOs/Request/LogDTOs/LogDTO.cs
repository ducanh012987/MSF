namespace DTOs.Request.LogDTOs
{
    public class LogDTO
    {
        public int Id { get; set; }
        public int StatusCode { get; set; }
        public string? Method { get; set; }
        public string? Url { get; set; }
        public string? ClientIpAddress { get; set; }
        public string? ClientName { get; set; }
        public string? Exceptions { get; set; }
        public string? Username { get; set; }
        public DateTime Time { get; set; }
        public int Duration { get; set; }
    }
}
