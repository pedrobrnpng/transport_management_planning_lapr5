using metadataviagens.Controllers;
using metadataviagens.Services.Viagens;
using metadataviagens.Infrastructure.Viagens;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NUnit.Framework;
using Moq;
using DDDSample1.Domain.Shared;
using Microsoft.AspNetCore.Mvc;

using metadataviagens.Domain.Viagens;

namespace metadataviagens.Tests.integration
{
    public class ViagensIntegrationTests
    {
        private ViagensController _viagemController;
        private ViagemService _viagemService;
        private Mock<IUnitOfWork> _unitOfWorkMock;
        private Mock<IViagemRepository> _viagemRepositoryMock;
        private Mock<IPercursoService> _percursoServiceMock;
        private Mock<ILinhaService> _linhaServiceMock;
        private CriarViagemDto _criarViagensDto;
        private ViagemDto _viagemDto;
        private Viagem _viagem;
        private Viagem _viagemNull;
        private List<Viagem> _list;

        [SetUp]
        public void Setup()
        {
            int codigo = 1;
            DateTime horaInicio = DateTime.Now.AddDays(1);
            PercursoDto percursoId = new PercursoDto("1", null, "1");
            bool v = true;
            this._criarViagensDto = new CriarViagemDto(codigo, horaInicio, "1", "1");
            this._viagemDto = new ViagemDto(new Guid(), codigo, horaInicio, "1", "1");
            this._viagem = new Viagem(codigo, horaInicio, new LinhaId("1"), new PercursoId("1"));
            this._list = new List<Viagem>();
            _list.Add(this._viagem);
            this._viagemNull = null;

            this._unitOfWorkMock = new Mock<IUnitOfWork>();
            this._viagemRepositoryMock = new Mock<IViagemRepository>();
            this._percursoServiceMock = new Mock<IPercursoService>();
            this._linhaServiceMock = new Mock<ILinhaService>();

            this._viagemRepositoryMock.Setup(t => t.AddAsync(It.IsAny<Viagem>()));
            this._viagemRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<int>())).Returns(Task.FromResult(this._viagemNull));
            this._viagemRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));

            this._unitOfWorkMock.Setup(u => u.CommitAsync());

            this._percursoServiceMock.Setup(p => p.ifExists(It.IsAny<string>())).Returns(Task.FromResult(percursoId));

            this._linhaServiceMock.Setup(p => p.ifExists(It.IsAny<string>())).Returns(Task.FromResult(v));

            this._viagemService = new ViagemService(this._unitOfWorkMock.Object, this._viagemRepositoryMock.Object, this._percursoServiceMock.Object, this._linhaServiceMock.Object);
            this._viagemController = new ViagensController(this._viagemService);
        }

        [Test]
        public void ShouldCreateViagem()
        {
            var result = this._viagemController.Create(this._criarViagensDto);

    	    this._viagemRepositoryMock.Verify(t => t.GetByDomainIdAsync(It.IsAny<int>()), Times.AtLeastOnce());
            this._viagemRepositoryMock.Verify(t => t.AddAsync(It.IsAny<Viagem>()), Times.AtLeastOnce());
            this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
            Assert.IsInstanceOf<Task<ActionResult<ViagemDto>>>(result);
        }
    }
}
