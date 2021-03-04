using System.Threading.Tasks;
using System.Collections.Generic;
using metadataviagens.Domain.BlocosTrabalho;

namespace metadataviagens.Services.BlocosTrabalho
{
    public interface IBlocoTrabalhoService
    {
        Task<BlocoTrabalhoDto> AddAsync(CriarBlocoTrabalhoDto dto);
        Task<BlocoTrabalhoDto> AddAsync(CriarBlocoSemCodigoDto dto);
        Task<BlocoTrabalhoDto> GetByDomainIdAsync(int id);
        Task<List<BlocoTrabalhoDto>> GetAllAsync();
        Task<List<BlocoTrabalhoDto>> GetAllWithoutServicoViaturaAsync();
        Task<List<BlocoTrabalhoDto>> GetAllWithoutServicoTripulanteAsync();
        Task<bool> EndsInPontoRendicao(BlocoTrabalho bloco);
    }
}