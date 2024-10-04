using DTOs.Request.RefreshTokenDTOs;
using DTOs.Request.UserDTOs;
using DTOs.Responses;

namespace Business.Repository
{
    public interface ITokenRepository
    {
        string GenerateToken(UserDto userDto);
        string GenerateRefreshToken(UserDto userDto);
        Task<ResponseObject<TokenResult>> RefreshAccessToken(string refreshToken);
        ResponseText SaveRefreshToken(RefreshTokenDto refreshTokenDto);
        Task<RefreshTokenDto> GetRefreshTokenByToken(string refreshToken);
    }
}
