using System;
using System.Collections.Generic;

namespace metadataviagens.Domain.ServicosViatura
{
    public class ServicoViaturaDto
    {
        public Guid Id { get; set; }
        public string nome { get; set; }
        public string cor { get; set; }
        public string depots { get; set; }
        public string viatura { get; set; }
        public List<int> blocos { get; private set; }

        public ServicoViaturaDto(Guid Id, string nome, string cor, string depots, string viatura, List<int> blocos)
        {
            this.Id= Id;
            this.nome = nome;
            this.cor = cor;
            this.depots = depots;
            this.viatura = viatura;
            this.blocos = blocos;
        }
    }
}