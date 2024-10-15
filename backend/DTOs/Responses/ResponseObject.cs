﻿namespace DTOs.Responses
{
    public class ResponseObject<T>
    {
        public int Status { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }

        public ResponseObject() { }

        public ResponseObject(int status, string message, T data)
        {
            Status = status;
            Message = message;
            Data = data;
        }

        public ResponseObject(int status, string message)
        {
            Status = status;
            Message = message;
        }
    }
}
