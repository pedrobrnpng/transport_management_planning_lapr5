using System;

namespace metadataviagens.Domain.Users
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string nome { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int func { get; private set; }

        public UserDto(Guid Id, string nome, string email, string password, int func)
        {
            this.Id = Id;
            this.nome = nome;
            this.email = email;
            this.password = password;
            this.func = func;
        }
    }
}