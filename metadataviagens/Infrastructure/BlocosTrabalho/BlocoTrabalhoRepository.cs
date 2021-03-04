using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.BlocosTrabalho;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace metadataviagens.Infrastructure.BlocosTrabalho
{
    public class BlocoTrabalhoRepository: BaseRepository<BlocoTrabalho, BlocoTrabalhoId>,IBlocoTrabalhoRepository
    {
        private readonly DbSet<BlocoTrabalho> _objs;

        public BlocoTrabalhoRepository(DDDSample1DbContext context):base(context.BlocosTrabalho)
        {
            this._objs=context.BlocosTrabalho;  
        }

        public async Task<BlocoTrabalho> GetByDomainIdAsync(int codigo)
        {
            return await this._objs
                .Where(x => codigo.Equals(x.codigo)).FirstOrDefaultAsync();
        }

        public async Task<BlocoTrabalho> GetByParametersAsync(int horaInicio, int horaFim, string noInicio, string noFim)
        {
            return await this._objs
                .Where(x => horaInicio.Equals(x.horaInicio))
                .Where(x => horaFim.Equals(x.horaFim))
                .Where(x => noInicio.Equals(x.noInicio))
                .Where(x => noFim.Equals(x.noFim)).FirstOrDefaultAsync();
        }

        public async Task<int> GetLastAsync()
        {
            var bloco = await this._objs
                .OrderByDescending(x => x.codigo).FirstOrDefaultAsync();

            if (bloco == null)
                return 0;
            
            return bloco.codigo;
        }

        public async Task<List<BlocoTrabalho>> GetAllOrderedAsync()
        {
            return await this._objs.OrderBy(x => x.codigo).ToListAsync();
        }
    }
}