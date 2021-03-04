using DDDSample1.Domain.Shared;
using System.Threading.Tasks;
using metadataviagens.Domain.Users;

namespace metadataviagens.Infrastructure.Users
{
    public interface IUserRepository : IRepository<User,UserId>
    {
        Task<User> GetByDomainIdAsync(string email);
    }
}