using metadataviagens.Domain.Viaturas;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace metadataviagens.Services.Viaturas
{
    public interface IViaturaService
    {
        Task<ViaturaDto> AddAsync(CriarViaturaDto dto);
        Task<ViaturaDto> GetByDomainIdAsync(string id);
        Task<ViaturaDto> GetByVINAsync(string vin);
        Task<List<ViaturaDto>> GetAllAsync();
    }
}
