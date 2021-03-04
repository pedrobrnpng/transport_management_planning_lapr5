// using NUnit.Framework;
// using Moq;
// using System.Threading.Tasks;
// using System;
// using System.Collections.Generic;
// using DDDSample1.Domain.Shared;
// using metadataviagens.Domain.BlocosTrabalho;
// using metadataviagens.Infrastructure.BlocosTrabalho;
// using metadataviagens.Services.BlocosTrabalho;
// using metadataviagens.Domain.BlocosViagens;
// using metadataviagens.Domain.Percursos;
// using metadataviagens.Infrastructure.BlocosViagens;
// using metadataviagens.Services.BlocosViagens;
// using metadataviagens.Domain.Viagens;
// using metadataviagens.Infrastructure.Viagens;
// using metadataviagens.Services.Viagens;
// using metadataviagens.Domain.Shared;
// using metadataviagens.Controllers;
// using Microsoft.AspNetCore.Mvc;

// namespace metadataviagens.Tests.integration
// {
//     public class BlocosTrabalhoIntegrationTests
//     {
//         private BlocoTrabalhoController _blocoTrabalhoController;
//         private BlocoTrabalhoService _blocoTrabalhoService;
//         private BlocoViagemService _blocoViagemService;
//         private Mock<IUnitOfWork> _unitOfWorkMock;
//         private Mock<IBlocoTrabalhoRepository> _blocoTrabalhoRepositoryMock;
//         private Mock<IBlocoViagemRepository> _blocoViagemRepository;
//         private Mock<IViagemRepository> _viagemRepository;
//         private CriarBlocoTrabalhoDto _criarBlocoTrabalhoDto;
//         private BlocoTrabalhoDto _blocoTrabalhoDto;
//         private BlocoTrabalho _blocoTrabalho;
//         private BlocoViagem _blocoViagem1;
//         private BlocoViagem _blocoViagem2;
//         private Viagem _viagem;
//         private List<BlocoTrabalho> _list;
//         private List<BlocoViagem> _BVlist;

//         [SetUp]
//         public void Setup()
//         {
//             this._blocoTrabalho = new BlocoTrabalho("1", 126, 129, "1", "3", true);
//             this._criarBlocoTrabalhoDto = new CriarBlocoTrabalhoDto("1", 126, 129, "1", "3", true);
//             this._blocoTrabalhoDto = new BlocoTrabalhoDto(new Guid(), "1", 126, 129, "1", "3", true);
//             this._list = new List<BlocoTrabalho>();
//             _list.Add(this._blocoTrabalho);

//             this._blocoViagem1= new BlocoViagem(this._blocoTrabalho, new Viagem(DateTime.Parse("12/12/2010"), 1, 1, new PercursoId("1"), new PercursoId("2")));
//             this._blocoViagem2= new BlocoViagem(this._blocoTrabalho, new Viagem(DateTime.Parse("13/12/2010"), 2, 2, new PercursoId("3"), new PercursoId("4")));

//             this._viagem = Viagem(DateTime.Parse("12/12/2010"), 1, 1, new PercursoId("1"), new PercursoId("2"));

//             this._unitOfWorkMock = new Mock<IUnitOfWork>();
//             this._blocoTrabalhoRepositoryMock = new Mock<IBlocoTrabalhoRepository>();
//             this._blocoViagemRepository = new Mock<IBlocoViagemRepository>();

//             this._blocoTrabalhoRepositoryMock.Setup(t => t.AddAsync(It.IsAny<BlocoTrabalho>()));
//             this._blocoTrabalhoRepositoryMock.Setup(t => t.GetByDomainIdAsync(It.IsAny<string>())).Returns(Task.FromResult(this._blocoTrabalho));
//             this._blocoTrabalhoRepositoryMock.Setup(t => t.GetAllAsync()).Returns(Task.FromResult(this._list));
//             this._blocoViagemRepository.Setup(t => t.GetByIdAsync(It.IsAny<BlocoViagemId>())).Returns(Task.FromResult(this._blocoViagem1));
//             this._viagemRepository.Setup(t => t.GetByIdAsync(It.IsAny<ViagemId>())).Returns(Task.FromResult(this.viagem));
//             this._unitOfWorkMock.Setup(u => u.CommitAsync());

//             this._blocoTrabalhoService = new BlocoTrabalhoService(this._unitOfWorkMock.Object,
//             this._blocoTrabalhoRepositoryMock.Object);
//             this._blocoViagemService = new BlocoViagemService(this._unitOfWorkMock.Object,
//             this._blocoViagemRepository.Object, this._blocoTrabalhoRepositoryMock.Object, this._viagemRepository.Object);
//             this._blocoTrabalhoController = new BlocoTrabalhoController(this._blocoTrabalhoService, this._blocoViagemService);
//         }

//         [Test]
//         public void ShouldCreateBlocoTrabalho()
//         {
//             var result = this._blocoTrabalhoController.Create(this._criarBlocoTrabalhoDto);

//             this._blocoTrabalhoRepositoryMock.Verify(t => t.AddAsync(It.IsAny<BlocoTrabalho>()), Times.AtLeastOnce());
//             this._unitOfWorkMock.Verify(u => u.CommitAsync(), Times.AtLeastOnce());
//             Assert.IsInstanceOf<Task<ActionResult<BlocoTrabalhoDto>>>(result);
//         }
//     }
// }