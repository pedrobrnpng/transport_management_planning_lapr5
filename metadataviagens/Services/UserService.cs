using System.Xml;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using metadataviagens.Mappers.Users;
using System;
using metadataviagens.Services;
using System.Collections.Generic;
using metadataviagens.Domain.Users;
using metadataviagens.Infrastructure.Users;

namespace metadataviagens.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserRepository _repo;

        public UserService(IUnitOfWork unitOfWork, IUserRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public async Task<UserDto> AddAsync(CriarUserDto dto)
        {
            var user = UserMapper.toDomain(dto.nome, dto.email, EncryptPass.ComputeHash(dto.password, "SHA512", null), dto.func);

            await this._repo.AddAsync(user);

            await this._unitOfWork.CommitAsync();

            return UserMapper.toDTO(user);
        }

        public async Task<UserDto> GetByDomainIdAsync(string id)
        {
            var user = await this._repo.GetByDomainIdAsync(id);

            if (user == null)
                return null;

            return UserMapper.toDTO(user);
        }

        public async Task<UserDto> AuthenticateUser(string id, string password)
        {
            var user = await this._repo.GetByDomainIdAsync(id);

            if (user == null)
                return null;

            if (!EncryptPass.VerifyHash(password, "SHA512", user.password))
                return null;

            return UserMapper.toDTO(user);
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();

            List<UserDto> listDto = list.ConvertAll<UserDto>(user =>
                new UserDto(user.Id.AsGuid(), user.nome, user.email, user.password, user.func));

            return listDto;
        }

        public async Task<UserDto> DeleteByDomainIdAsync(string domainId)
        {
            var user = await this._repo.GetByDomainIdAsync(domainId);

            if (user == null)
                return null;

            this._repo.Remove(user);

            await this._unitOfWork.CommitAsync();

            return UserMapper.toDTO(user);
        }

        public async Task<UserDto> UpdateByDomainIdAsync(string domainId, CriarUserDto updateUserDto)
        {
            var userExisting = await this._repo.GetByDomainIdAsync(domainId);

            if (userExisting == null)
                return null;

            if (updateUserDto.email.Trim() != "" && updateUserDto.email != userExisting.email)
            {
                await this.DeleteByDomainIdAsync(domainId);
                if (updateUserDto.nome.Trim() == "")
                    updateUserDto.nome = userExisting.nome;

                if (updateUserDto.password.Trim() == "")
                    updateUserDto.password = userExisting.password;

                var user = UserMapper.toDomain(updateUserDto.nome, updateUserDto.email, EncryptPass.ComputeHash(updateUserDto.password, "SHA512", null), userExisting.func);
                await this._repo.AddAsync(user);
                await this._unitOfWork.CommitAsync();
                return UserMapper.toDTO(user);
            }
            else
            {
                if (updateUserDto.nome.Trim() != "")
                    userExisting.nome = updateUserDto.nome;

                if (updateUserDto.password.Trim() != "")
                    userExisting.password = EncryptPass.ComputeHash(updateUserDto.password, "SHA512", null);
                await this._unitOfWork.CommitAsync();

                return UserMapper.toDTO(userExisting);
            }
        }
    }
}