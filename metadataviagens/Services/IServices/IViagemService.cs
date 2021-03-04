using System.Threading.Tasks;
using metadataviagens.Domain.Viagens;
using System.Collections.Generic;

namespace metadataviagens.Services.Viagens
{
    public interface IViagemService
    {
        Task<ViagemDto> AddAsync(CriarViagemDto dto);
        Task<ViagemDto> AddAsync(CriarViagemSemCodigoDto dto);
        Task<ViagemDto[]> AddAsync(CriarViagensDto dto);
        Task<ViagemDto> GetByDomainIdAsync(int id);
        Task<List<ViagemDto>> GetAllAsync();
    }
}