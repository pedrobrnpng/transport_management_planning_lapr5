using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.Viagens;
using DDDSample1.Infrastructure;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.Viagens
{
    public class ViagemRepository : BaseRepository<Viagem, ViagemId>,IViagemRepository
    {
        private readonly DbSet<Viagem> _objs;

        public ViagemRepository(DDDSample1DbContext context):base(context.Viagens)
        {
           this._objs=context.Viagens;
        }

        public async Task<Viagem> GetByDomainIdAsync(int codigo)
        {
            return await this._objs
                .Where(x => codigo.Equals(x.codigo)).FirstOrDefaultAsync();
        }

         public async Task<Viagem> GetByIdAsync(string id)
        {
            return await this._objs
                .Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
        }

        public async Task<List<Viagem>> GetAllOrderedAsync()
        {
            return await this._objs
                .OrderBy(x => x.codigo).ToListAsync();
        }

        public async Task<int> GetLastAsync()
        {
            var viagem = await this._objs
                .OrderByDescending(x => x.codigo).FirstOrDefaultAsync();

            if (viagem == null)
                return 0;
            
            return viagem.codigo;
        }
    }
}