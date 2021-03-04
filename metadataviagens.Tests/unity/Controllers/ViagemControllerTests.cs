using NUnit.Framework;
using metadataviagens.Controllers;
using metadataviagens.Domain.Viagens;
using metadataviagens.Services.Viagens;
using Moq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace metadataviagens.Tests.unity.Controllers
{
    [TestFixture]
    public class ViagemControllerTests
    {
        private ViagensController _viagemController;
        private Mock<IViagemService> _viagemServiceMock;
        private CriarViagemDto _criarViagemDto;
        private ViagemDto _viagemDtoMock;
        private List<ViagemDto> _viagemDtoList;

        [SetUp]
        public void Setup()
        {
            int codigo = 1;
            this._viagemServiceMock = new Mock<IViagemService>();
            this._criarViagemDto = new CriarViagemDto(codigo, DateTime.Now.AddDays(1), "1", "1");
            this._viagemDtoMock = new ViagemDto(new Guid(), codigo, DateTime.Now.AddDays(1), "1", "1");
            this._viagemServiceMock.Setup(t => t.AddAsync(It.IsAny<CriarViagemDto>()))
                .Returns(Task.FromResult(this._viagemDtoMock));
            this._viagemServiceMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>()))
                .Returns(Task.FromResult(this._viagemDtoMock));
            this._viagemController = new ViagensController(this._viagemServiceMock.Object);
        }

        [Test]
        public void ShouldCreateViagem()
        {
            var result = this._viagemController.Create(this._criarViagemDto);
            this._viagemServiceMock.Verify(t => t.AddAsync(It.IsAny<CriarViagemDto>()), Times.AtLeastOnce());
        }
    }
}