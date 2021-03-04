using System;

namespace metadataviagens.Domain.Users
{
    public class AuthDto
    {
        public string email { get; set; }
        public string password { get; set; }

        public AuthDto(string email, string password)
        {
            this.email = email;
            this.password = password;
        }
    }
}