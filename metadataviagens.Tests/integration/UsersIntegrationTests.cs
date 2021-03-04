using NUnit.Framework;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Users;
using metadataviagens.Infrastructure.Users;
using metadataviagens.Services.Users;
using metadataviagens.Domain.Shared;
using metadataviagens.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace metadataviagens.Tests.integration
{
    public class UsersIntegrationTests
    {
        private UsersController _userController;
        private UserService _userService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IUserRepository> _userRepositoryMock;
        private CriarUserDto _criarUserDto;
        private UserDto _userDto;
        private User _user;
        private List<User> _list;

        [SetUp]
        public void Setup()
        {
            this._user = new User("Teste", "teste@gmail.com", "password", 1);
            this._criarUserDto = new CriarUserDto("Teste", "teste@gmail.com", "password", 1);
            this._userDto = new UserDto(new Guid(), "Teste", "teste@gmail.com", "password", 1);
            this._list = new List<User>();
            _list.Add(this._user);

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._userRepositoryMock = new Mock<IUserRepository>();

            this._userRepositoryMock.Setup(t => t.AddAsync(It.IsAny<User>()));
            this._userRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(this._user));
            this._userRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));
            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._userService = new UserService(this._unitOfWorkMock.Object,
            this._userRepositoryMock.Object);
            this._userController = new UsersController(this._userService);
        }

        [Test]
        public void ShouldCreateUser()
        {
            var result = this._userController.Create(this._criarUserDto);

            this._userRepositoryMock.Verify(t => t.AddAsync(It.IsAny<User>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<UserDto>>>(result);
        }
    }
}