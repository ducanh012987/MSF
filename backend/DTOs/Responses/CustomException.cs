namespace DTOs.Responses
{
    public class CustomException(int errorCode, string errorMessage, Exception? innerException = null) : Exception(errorMessage, innerException)
    {
        public int ErrorCode { get; set; } = errorCode;
        public string ErrorMessage { get; set; } = errorMessage;
    }
}
