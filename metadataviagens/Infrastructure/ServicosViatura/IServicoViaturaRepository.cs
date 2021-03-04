using System.Security.AccessControl;
using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using metadataviagens.Domain.ServicosViatura;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.ServicosViatura
{
    public interface IServicoViaturaRepository: IRepository<ServicoViatura,ServicoViaturaId>
    {
        Task<ServicoViatura> GetByDomainIdAsync(string nome);
        Task<List<ServicoViatura>> GetAllOrderedAsync();
    }
}