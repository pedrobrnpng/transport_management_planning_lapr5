using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.ServicosViatura;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.ServicosViatura
{
    public class ServicoViaturaRepository: BaseRepository<ServicoViatura, ServicoViaturaId>,IServicoViaturaRepository
    {
        private readonly DbSet<ServicoViatura> _objs;

        public ServicoViaturaRepository(DDDSample1DbContext context):base(context.ServicosViatura)
        {
            this._objs=context.ServicosViatura;
        }

        public async Task<ServicoViatura> GetByDomainIdAsync(string nome)
        {
            return await this._objs
                .Where(x => nome.Equals(x.nome)).Include(x => x.viatura).Include(x => x.blocos).FirstOrDefaultAsync();
        }

        public async Task<List<ServicoViatura>> GetAllOrderedAsync()
        {
            return await this._objs
                .OrderBy(x => x.nome).Include(x => x.viatura).Include(x => x.blocos).ToListAsync();
        }
    }
}