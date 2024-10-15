using DTOs.Request.AccessDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface IUserRepository
    {
        Task<ResponseObject<LoginResult>> Login(LoginRequest loginRequest);
        Task<ResponseText> Register(RegisterRequest registerRequest);
        Task<ResponseObject<PagedResult<UserDto>>> GetAllUser(int pageNumber, int pageSize);
        Task<ResponseObject<UserDto>> GetUserById(int id);
        Task<UserDto> GetUserByUsername(string Username);
        Task<ResponseText> CreateUser(UserInput userInput);
        Task<ResponseText> UpdateUser(int id, UserUpdate userUpdate);
        Task<ResponseText> DeleteUser(int id);
        Task<UserDto> GetUser(int id);
    }
}
