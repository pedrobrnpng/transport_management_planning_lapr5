using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.Viaturas;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace metadataviagens.Infrastructure.Viaturas
{
    public class ViaturaRepository : BaseRepository<Viatura, ViaturaId>,IViaturaRepository
    {
        private readonly DbSet<Viatura> _objs;
        public ViaturaRepository(DDDSample1DbContext context): base(context.Viaturas)
        {
            this._objs = context.Viaturas;
        }

        public async Task<Viatura> GetByDomainIdAsync(string matricula)
        {
            return await this._objs.Where(x => matricula.Equals(x.matricula)).FirstOrDefaultAsync();
        }

        public async Task<Viatura> GetByVINAsync(string vin)
        {
            return await this._objs.Where(x => vin.Equals(x.vin)).FirstOrDefaultAsync();
        }
    }
}
