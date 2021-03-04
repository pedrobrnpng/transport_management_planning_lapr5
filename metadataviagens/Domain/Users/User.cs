using System;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.Users
{
    public class User : Entity<UserId>, IAggregateRoot
    {
        public string nome { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public int func { get; set; }

        public User()
        {
        }

        private Boolean verificaUser(string nome, string email, string password, int func)
        {
            if(nome == null || email == null || password == null) {
                return false;
            }
            
            return func>0 && func<4;
        }

        public User(string nome, string email, string password, int func)
        {
            if(!verificaUser(nome, email, password, func)) {
                throw new BusinessRuleValidationException("Utilizador inválido");
            }
            this.Id = new UserId(Guid.NewGuid());
            this.nome = nome;
            this.email = email;
            this.password = password;
            this.func = func;
        }

        public String toString() {
            return this.Id.AsString();
        }
    }
}