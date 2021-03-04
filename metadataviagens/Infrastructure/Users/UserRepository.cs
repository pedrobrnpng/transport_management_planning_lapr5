using DDDSample1.Infrastructure.Shared;
using metadataviagens.Domain.Users;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace metadataviagens.Infrastructure.Users
{
    public class UserRepository : BaseRepository<User, UserId>,IUserRepository
    {
        private readonly DbSet<User> _objs;
        
        public UserRepository(DDDSample1DbContext context):base(context.Users)
        {
           this._objs=context.Users;
        }

        public async Task<User> GetByDomainIdAsync(string email)
        {
            return await this._objs
                .Where(x => email.Equals(x.email)).FirstOrDefaultAsync();
        }
    }
}