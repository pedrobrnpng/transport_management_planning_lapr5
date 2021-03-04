using System.Threading.Tasks;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosViagens;

namespace metadataviagens.Services.BlocosViagens
{
    public interface IBlocoViagemService
    {
        Task<BlocoViagemDto> AddAsync(int codigo, CriarBlocoViagemDto dto);
        Task<BlocoViagemDto> GetByIdAsync(BlocoViagemId id);
        Task<ViagemListDto> GetViagensOfBlocoByIdAsync(int blocoId);
        Task<ViagemListDto> GetPossibleViagensOfBlocoByIdAsync(int blocoId);
    }
}