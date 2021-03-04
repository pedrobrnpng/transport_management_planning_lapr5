using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Infrastructure.ServicosViatura;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Mappers;
using System;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Infrastructure.Viaturas;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;

namespace metadataviagens.Services.ServicosViatura
{
    public class ServicoViaturaService: IServicoViaturaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IServicoViaturaRepository _repo;
        private readonly IViaturaRepository _viatRepo;
        private readonly IBlocoTrabalhoRepository _blocoTrabalhoRepo;
        private readonly IBlocoViagemRepository _blocoViagemRepo;
        private readonly IBlocoTrabalhoService _blocoTrabalhoService;

        public ServicoViaturaService(IUnitOfWork unitOfWork, IServicoViaturaRepository repo,
        IViaturaRepository viatRepo,
        IBlocoTrabalhoRepository blocoTrabalhoRepository,
        IBlocoViagemRepository blocoViagemRepository,
        IBlocoTrabalhoService blocoTrabalhoService)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._viatRepo = viatRepo;
            this._blocoTrabalhoRepo = blocoTrabalhoRepository;
            this._blocoViagemRepo = blocoViagemRepository;
            this._blocoTrabalhoService = blocoTrabalhoService;
        }

        public async Task<ServicoViaturaDto> AddAsync(CriarServicoViaturaDto dto)
        {

            var viatura = await this._viatRepo.GetByDomainIdAsync(dto.viatura);
            if(viatura==null) {
                throw new BusinessRuleValidationException("Viatura não existe");
            }
            var blocos = new List<BlocoTrabalho>();
            for (int i=0;i<dto.blocos.Count;i++)
            {
                var bloc = dto.blocos[i];
                var bloco= await this._blocoTrabalhoRepo.GetByDomainIdAsync(bloc);
                if(bloco==null) {
                    throw new BusinessRuleValidationException("Bloco de trabalho não existe");
                }

                if (i>0) {
                    var bloc0 = dto.blocos[i-1]; 
                    var bloco0= await this._blocoTrabalhoRepo.GetByDomainIdAsync(bloc0);
                    if (bloco0.noFim.Equals(bloco.noInicio)) {
                        if (await this._blocoTrabalhoService.EndsInPontoRendicao(bloco0))
                            return null;
                    }
                }

                blocos.Add(bloco);
            }

            var sv_cod = await this._repo.GetByDomainIdAsync(dto.nome);
            if (sv_cod != null)
                return null;

            var servicoV = ServicoViaturaMapper.toDomain(dto.nome, dto.cor, dto.depots, viatura, blocos);

            await this._repo.AddAsync(servicoV);

            await this._unitOfWork.CommitAsync();

            return ServicoViaturaMapper.toDTO(servicoV);
        }

        public async Task<ServicoViaturaDto> GetByDomainIdAsync(string id)
        {
            var servico = await this._repo.GetByDomainIdAsync(id);
            
            if(servico == null)
                return null;

            return ServicoViaturaMapper.toDTO(servico);
        }

        public async Task<List<ServicoViaturaDto>> GetSVsOfDayAsync(DateTime date)
        {
            List<ServicoViaturaDto> sv_list = new List<ServicoViaturaDto>();
            bool found;

            var svs = await this._repo.GetAllOrderedAsync();

            foreach (var sv in svs)
            {
                found=false;
                var blocos = sv.blocos;
                foreach (var bloco in blocos)
                {
                    if (found) break;
                    var viagens = await this._blocoViagemRepo.GetViagensOfBlocoAsync(bloco.codigo);
                    foreach (var viagem in viagens ) 
                    {
                        if (date.Date.CompareTo(viagem.viagem.horaInicio.Date) == 0) {
                            sv_list.Add(ServicoViaturaMapper.toDTO(sv));
                            found=true;
                            break;
                        }
                    }
                }
            }
            
            if(sv_list.Count == 0)
                return null;

            return sv_list;
        }

        public async Task<List<ServicoViaturaDto>> GetAllAsync()
        {
            var servsViat = await this._repo.GetAllOrderedAsync();
            var servsViatDto = new List<ServicoViaturaDto>();

            if (servsViat == null)
                return null;

            foreach (var sv in servsViat)
            {
                servsViatDto.Add(ServicoViaturaMapper.toDTO(sv));
            }

            return servsViatDto;
        }
    }
}