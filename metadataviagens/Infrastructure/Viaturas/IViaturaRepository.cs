using DDDSample1.Domain.Shared;
using System.Threading.Tasks;

namespace metadataviagens.Domain.Viaturas
{
    public interface IViaturaRepository: IRepository<Viatura,ViaturaId>
    {
        Task<Viatura> GetByDomainIdAsync(string matricula);
        Task<Viatura> GetByVINAsync(string vin);
    }
}
