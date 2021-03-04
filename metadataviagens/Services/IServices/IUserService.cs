using System.Threading.Tasks;
using metadataviagens.Domain.Users;
using System.Collections.Generic;

namespace metadataviagens.Services.Users
{
    public interface IUserService
    {
        Task<UserDto> AddAsync(CriarUserDto dto);
        Task<UserDto> GetByDomainIdAsync(string id);
        Task<UserDto> AuthenticateUser(string id, string password);
        Task<List<UserDto>> GetAllAsync();
        Task<UserDto> DeleteByDomainIdAsync(string domainId);
        Task<UserDto> UpdateByDomainIdAsync(string domainId,CriarUserDto user);
    }
}