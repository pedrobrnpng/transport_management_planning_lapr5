using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.BlocosViagens;
using DDDSample1.Infrastructure;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace metadataviagens.Infrastructure.BlocosViagens
{
    public class BlocoViagemRepository: BaseRepository<BlocoViagem, BlocoViagemId>,IBlocoViagemRepository
    {
        private readonly DbSet<BlocoViagem> _objs;

        public BlocoViagemRepository(DDDSample1DbContext context):base(context.BlocosViagem)
        {
           this._objs=context.BlocosViagem;
        }

        public async Task<List<BlocoViagem>> GetViagensOfBlocoAsync(int blocoId)
        {
            return await this._objs
                .Where(x => blocoId.Equals(x.bloco.codigo)).Include(x => x.bloco).Include(x => x.viagem).ToListAsync();
        }

        public async Task<BlocoViagem> GetById1Async(BlocoViagemId id)
        {
            return await this._objs.Where(x => id==x.Id).Include(x => x.bloco).Include(x => x.viagem).FirstOrDefaultAsync();
        }
    }
}