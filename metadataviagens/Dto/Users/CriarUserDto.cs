using System;

namespace metadataviagens.Domain.Users
{
    public class CriarUserDto
    {
        public string nome { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int func { get; private set; }

        public CriarUserDto(string nome, string email, string password, int func)
        {
            this.nome = nome;
            this.email = email;
            this.password = password;
            this.func = func;
        }
    }
}