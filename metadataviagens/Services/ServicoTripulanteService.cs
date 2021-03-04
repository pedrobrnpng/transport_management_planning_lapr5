using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Infrastructure.ServicosTripulante;
using metadataviagens.Mappers;
using System;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.Shared;
using System.Collections.Generic;
using metadataviagens.Infrastructure.Tripulantes;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Domain.ServicosTripulante;

namespace metadataviagens.Services.ServicosTripulante
{
    public class ServicoTripulanteService: IServicosTripulanteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IServicoTripulanteRepository _repo;
        private readonly ITripulanteRepository _tripRepo;
        private readonly IBlocoTrabalhoRepository _blocoTrabalhoRepo;
        private readonly IBlocoViagemRepository _blocoViagemRepo;

        public ServicoTripulanteService(IUnitOfWork unitOfWork, IServicoTripulanteRepository repo,
        ITripulanteRepository tripRepo, IBlocoTrabalhoRepository blocoTrabalhoRepository, IBlocoViagemRepository blocoViagemRepository)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._tripRepo = tripRepo;
            this._blocoTrabalhoRepo = blocoTrabalhoRepository;
            this._blocoViagemRepo = blocoViagemRepository;
            
        }

        public async Task<ServicoTripulanteDto> AddAsync(CriarServicoTripulanteDto dto)
        {
            int id;
            Int32.TryParse(dto.tripulanteDomainId, out id);
            var tripulante = await this._tripRepo.GetByDomainIdAsync(id);
            if(tripulante==null) {
                throw new BusinessRuleValidationException("Tripulante não existe");
            }
            var blocosTrabalho = new List<BlocoTrabalho>();
            foreach (int bloc in dto.blocosTrabalho)
            {
                var bloco= await this._blocoTrabalhoRepo.GetByDomainIdAsync(bloc);
                if(bloco==null) {
                    throw new BusinessRuleValidationException("Bloco de trabalho não existe");
                }
                blocosTrabalho.Add(bloco);
            }

            var st_cod = await this._repo.GetByDomainIdAsync(dto.nome);
            if (st_cod != null)
                return null;
            
            var servicoTripulante = ServicoTripulanteMapper.toDomain(tripulante, dto.nome, dto.cor, blocosTrabalho);
            await this._repo.AddAsync(servicoTripulante);

            await this._unitOfWork.CommitAsync();

            return ServicoTripulanteMapper.toDTO(servicoTripulante);
        }

        public async Task<ServicoTripulanteDto> GetByDomainIdAsync(string id)
        {
            var servicoTripulante = await this._repo.GetByDomainIdAsync(id);

            if (servicoTripulante == null)
                return null;

            return ServicoTripulanteMapper.toDTO(servicoTripulante);
        }

        public async Task<List<ServicoTripulanteDto>> GetSTsOfDayAsync(DateTime date)
        {
            List<ServicoTripulanteDto> st_list = new List<ServicoTripulanteDto>();
            bool found;

            var sts = await this._repo.GetAllOrderedAsync();

            foreach (var st in sts)
            {
                found=false;
                var blocos = st.blocosTrabalho;
                foreach (var bloco in blocos)
                {
                    if (found) break;
                    var viagens = await this._blocoViagemRepo.GetViagensOfBlocoAsync(bloco.codigo);
                    foreach (var viagem in viagens ) 
                    {
                        if (date.Date.CompareTo(viagem.viagem.horaInicio.Date) == 0) {
                            st_list.Add(ServicoTripulanteMapper.toDTO(st));
                            found=true;
                            break;
                        }
                    }
                }
            }
            
            if(st_list.Count == 0)
                return null;

            return st_list;
        }

        public async Task<List<ServicoTripulanteDto>> GetAllAsync()
        {
            var servsTrip = await this._repo.GetAllOrderedAsync();
            var servsTripDto = new List<ServicoTripulanteDto>();

            if (servsTrip == null)
                return null;

            foreach (var st in servsTrip)
            {
                servsTripDto.Add(ServicoTripulanteMapper.toDTO(st));
            }

            return servsTripDto;
        }
    }
}