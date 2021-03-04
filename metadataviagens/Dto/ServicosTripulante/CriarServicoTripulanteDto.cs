using System;
using System.Collections.Generic;

namespace metadataviagens.Domain.ServicosTripulante
{
    public class CriarServicoTripulanteDto
    {
        public string tripulanteDomainId { get;   set; }
        public string nome { get; set; }
        public string cor { get; set; }
        public List<int> blocosTrabalho { get; set; }

        public CriarServicoTripulanteDto(string tripulanteDomainId, string nome, string cor, List<int> listaBlocosTrabalho)
        {
            this.tripulanteDomainId=tripulanteDomainId;
            this.nome=nome;
            this.cor=cor;
            this.blocosTrabalho=listaBlocosTrabalho;
        }
    }
}