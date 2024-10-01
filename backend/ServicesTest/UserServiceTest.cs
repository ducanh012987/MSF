using Business.Repository;
using DTOs.Request.AccessDTOs;
using DTOs.Responses;
using Moq;

namespace ServicesTest
{
    public class UserServiceTest
    {
        private readonly Mock<IUserRepository> _userRepoMock;
        public UserServiceTest() 
        {
            _userRepoMock = new Mock<IUserRepository>();
        }

        [Fact]
        public async Task Login_WithValidRequest_ShouldReturnLoginResult()
        {
            // Arrange
            var loginRequest = new LoginRequest { Username = "ducanh", Password = "password123" };
            var expectedResponse = new ResponseObject<LoginResult>(1 , "");

            _userRepoMock.Setup(service => service.Login(It.IsAny<LoginRequest>())).ReturnsAsync(expectedResponse);

            var userService = _userRepoMock.Object;

            // Act
            var result = await userService.Login(loginRequest);

            // Assert
            Assert.NotNull(result);
            Assert.Equal("sampleToken", result.Data!.AccessToken);
        }
    }
}