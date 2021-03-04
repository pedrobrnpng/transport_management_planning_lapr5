using System;
using System.Collections.Generic;

namespace metadataviagens.Domain.ServicosViatura
{
    public class CriarServicoViaturaDto
    {
        public string nome { get; set; }
        public string cor { get; set; }
        public string depots { get; set; }
        public string viatura { get; set; }
        public List<int> blocos { get; private set; }

        public CriarServicoViaturaDto(string nome, string cor, string depots, string viatura, List<int> blocos)
        {
            this.nome = nome;
            this.cor = cor;
            this.depots = depots;
            this.viatura = viatura;
            this.blocos = blocos;
        }
    }
}