using System;
using System.Collections.Generic;

namespace metadataviagens.Domain.ServicosTripulante
{
    public class ServicoTripulanteDto
    {
        public Guid Id { get; set; }
        public string tripulanteDomainId { get; set; }
        public string nome { get; set; }
        public string cor { get; set; }
        public List<int> blocosTrabalho {get; set; }



        public ServicoTripulanteDto(Guid Id, string tripulanteId, string nome, string cor, List<int> blocosTrabalho)
        {
            this.Id = Id;
            this.tripulanteDomainId = tripulanteId;
            this.nome=nome;
            this.cor=cor;
            this.blocosTrabalho=blocosTrabalho;
        }
    }
}