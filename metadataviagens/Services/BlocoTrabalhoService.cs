using System.Reflection.Metadata;
using System.Xml;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

using System;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Infrastructure.ServicosViatura;
using metadataviagens.Mappers.BlocosTrabalho;
using metadataviagens.Infrastructure.ServicosTripulante;
using metadataviagens.Mappers;

namespace metadataviagens.Services.BlocosTrabalho
{
    public class BlocoTrabalhoService : IBlocoTrabalhoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBlocoTrabalhoRepository _repo;
        private readonly IServicoViaturaRepository _SVrepo;
        private readonly IServicoTripulanteRepository _STrepo;
        private readonly INoService _noService;

        public BlocoTrabalhoService(IUnitOfWork unitOfWork, IBlocoTrabalhoRepository repo,
        IServicoViaturaRepository SVrepo, IServicoTripulanteRepository STrepo, INoService noService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._SVrepo = SVrepo;
            this._STrepo = STrepo;
            this._noService = noService;
        }

        public async Task<BlocoTrabalhoDto> AddAsync(CriarBlocoSemCodigoDto dto)
        {
            int codigo = await this._repo.GetLastAsync();

            if (dto.noInicio.Equals(dto.noFim))
                return null;

            if (await _noService.ifExists(dto.noInicio) is null)
                return null;
            
            if (await _noService.ifExists(dto.noFim) is null)
                return null;
            
            var bloco = BlocoTrabalhoMapper.toDomain(codigo+1, dto.horaInicio, dto.horaFim, dto.noInicio, dto.noFim, dto.ctt);

            var bloco_igual = await this._repo.GetByParametersAsync(dto.horaInicio, dto.horaFim, dto.noInicio, dto.noFim);
            if (bloco_igual != null)
                return null;

            await this._repo.AddAsync(bloco);

            await this._unitOfWork.CommitAsync();

            return BlocoTrabalhoMapper.toDTO(bloco);
        }

        public async Task<BlocoTrabalhoDto> AddAsync(CriarBlocoTrabalhoDto dto)
        {
            if (dto.noInicio.Equals(dto.noFim))
                return null;

            if (await _noService.ifExists(dto.noInicio) is null)
                return null;
            
            if (await _noService.ifExists(dto.noFim) is null)
                return null;

            var bloco = BlocoTrabalhoMapper.toDomain(dto.codigo, dto.horaInicio, dto.horaFim, dto.noInicio, dto.noFim, dto.ctt);

            var bloco_igual = await this._repo.GetByParametersAsync(dto.horaInicio, dto.horaFim, dto.noInicio, dto.noFim);
            if (bloco_igual != null)
                return null;

            var bloco_codigo = await this._repo.GetByDomainIdAsync(dto.codigo);
            if (bloco_codigo != null)
                return null;

            await this._repo.AddAsync(bloco);

            await this._unitOfWork.CommitAsync();

            return BlocoTrabalhoMapper.toDTO(bloco);
        }

        public async Task<BlocoTrabalhoDto> GetByDomainIdAsync(int id)
        {
            var bloco = await this._repo.GetByDomainIdAsync(id);

            if (bloco == null)
                return null;

            return BlocoTrabalhoMapper.toDTO(bloco);
        }

        public async Task<List<BlocoTrabalhoDto>> GetAllAsync()
        {
            var blocosTrabalhos = await this._repo.GetAllOrderedAsync();
            var blocosTrabalhoDto = new List<BlocoTrabalhoDto>();

            if (blocosTrabalhos == null)
                return null;

            foreach (var bloc in blocosTrabalhos)
            {
                blocosTrabalhoDto.Add(BlocoTrabalhoMapper.toDTO(bloc));
            }

            return blocosTrabalhoDto;
        }

        public async Task<List<BlocoTrabalhoDto>> GetAllWithoutServicoViaturaAsync()
        {
            var servicosViatura = await this._SVrepo.GetAllOrderedAsync();
            var blocosWithSV = new List<int>();

            if (servicosViatura == null)
                return null;

            foreach (var sv in servicosViatura)
            {
                foreach (var bloco in sv.blocos)
                {
                    blocosWithSV.Add(bloco.codigo);
                }
            }

            var blocosTrabalhos = await this._repo.GetAllAsync();
            var blocosTrabalhoDto = new List<BlocoTrabalhoDto>();

            if (blocosTrabalhos == null)
                return null;

            foreach (var bloc in blocosTrabalhos)
            {
                if (!blocosWithSV.Contains(bloc.codigo))
                    blocosTrabalhoDto.Add(BlocoTrabalhoMapper.toDTO(bloc));
            }

            return blocosTrabalhoDto;
        }

        public async Task<List<BlocoTrabalhoDto>> GetAllWithoutServicoTripulanteAsync()
        {
            var servicosTripulante = await this._STrepo.GetAllOrderedAsync();
            var blocosWithST = new List<int>();

            if (servicosTripulante == null)
                return null;

            foreach (var st in servicosTripulante)
            {
                foreach (var bloco in st.blocosTrabalho)
                {
                    blocosWithST.Add(bloco.codigo);
                }
            }

            var blocosTrabalhos = await this._repo.GetAllAsync();
            var blocosTrabalhoDto = new List<BlocoTrabalhoDto>();

            if (blocosTrabalhos == null)
                return null;

            foreach (var bloc in blocosTrabalhos)
            {
                if (!blocosWithST.Contains(bloc.codigo))
                    blocosTrabalhoDto.Add(BlocoTrabalhoMapper.toDTO(bloc));
            }

            return blocosTrabalhoDto;
        }

        public async Task<bool> EndsInPontoRendicao(BlocoTrabalho bloco) {
            var noF = await this._noService.ifExists(bloco.noFim);
            var tipo = noF.type;
            
            if (tipo.Equals("pontorendicao"))
                return true;
            
            return false;
        }
    }


}