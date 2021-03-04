using metadataviagens.Domain.Users;

namespace metadataviagens.Mappers.Users
{
    public class UserMapper
    {
        public static User toDomain(string nome, string email, string pass, int func) {
            return new User(nome, email, pass, func);
        }

        public static UserDto toDTO(User user)
        {
            return new UserDto(user.Id.AsGuid(), user.nome, user.email, user.password, user.func);
        }
    }
}