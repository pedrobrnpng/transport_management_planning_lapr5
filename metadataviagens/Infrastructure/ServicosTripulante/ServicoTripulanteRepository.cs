using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.ServicosTripulante;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;


namespace metadataviagens.Infrastructure.ServicosTripulante
{
    public class ServicoTripulanteRepository : BaseRepository<ServicoTripulante, ServicoTripulanteId>, IServicoTripulanteRepository
    {
        private readonly DbSet<ServicoTripulante> _objs;

        public ServicoTripulanteRepository(DDDSample1DbContext context) : base(context.ServicosTripulante)
        {
            this._objs = context.ServicosTripulante;
        }

        public async Task<ServicoTripulante> GetByDomainIdAsync(string nome)
        {
            return await this._objs
                .Where(x => nome.Equals(x.nome)).Include(x => x.tripulante).Include(x => x.blocosTrabalho).FirstOrDefaultAsync();
        }

        public async Task<List<ServicoTripulante>> GetAllOrderedAsync()
        {
            return await this._objs.OrderBy(x => x.nome).Include(x => x.tripulante).Include(x => x.blocosTrabalho).ToListAsync();
        }
    }
}