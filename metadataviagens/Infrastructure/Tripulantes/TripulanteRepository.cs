using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.Tripulantes;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace metadataviagens.Infrastructure.Tripulantes
{
    public class TripulanteRepository : BaseRepository<Tripulante, TripulanteId>, ITripulanteRepository
    {

        private readonly DbSet<Tripulante> _objs;
        public TripulanteRepository(DDDSample1DbContext context) : base(context.Tripulantes)
        {
            this._objs = context.Tripulantes;
        }

        public async Task<Tripulante> GetByDomainIdAsync(int numeroMecanografico)
        {
            return await this._objs
                .Where(x => numeroMecanografico == x.numeroMecanografico).FirstOrDefaultAsync();
        }

        public async Task<Tripulante> GetByNumeroCartaoCidadaoAsync(int numeroCartaoCidadao)
        {
            return await this._objs
                            .Where(x => numeroCartaoCidadao == x.numeroCartaoCidadao).FirstOrDefaultAsync();
        }

        public async Task<Tripulante> GetByNif(int nif)
        {
            return await this._objs
                            .Where(x => nif == x.nif).FirstOrDefaultAsync();
        }
    }
}