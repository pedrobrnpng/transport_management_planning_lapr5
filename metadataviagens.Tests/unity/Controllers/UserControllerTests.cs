using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.Users;
using metadataviagens.Services.Users;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace metadataviagens.Tests.unity.Controllers
{
    [TestFixture]
    public class UserControllerTests
    {
        private UsersController _userController;
        private Mock<IUserService> _userServiceMock;
        private CriarUserDto _criarUserDto;
        private UserDto _userDto;
        private List<UserDto> _userDtoList;
        
        [SetUp]
        public void Setup()
        {
            this._userServiceMock = new Mock<IUserService>();
            this._criarUserDto = new CriarUserDto("Teste", "teste@gmail.com", "password", 1);
            this._userDto = new UserDto(new Guid(), "Teste", "teste@gmail.com", "password", 1);
            this._userDtoList = new List<UserDto>();
            this._userDtoList.Add(this._userDto);

            this._userServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarUserDto>()))
            .Returns(Task.FromResult(this._userDto));
            this._userServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>()))
            .Returns(Task.FromResult(this._userDto));

            this._userController = new UsersController(this._userServiceMock.Object);
        }

        [Test]
        public void ShouldCreateUser()
        {
            var result = this._userController.Create(this._criarUserDto);
            this._userServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarUserDto>()), Times.AtLeastOnce());
            result = this._userController.GetByDomainId("Teste");
            this._userServiceMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<string>()), Times.AtLeastOnce());
            Assert.AreEqual(this._userDto, (result.Result).Value);
        }
    }
}