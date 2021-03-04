using System;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.Viagens;
using DDDSample1.Domain.Shared;

namespace metadataviagens.Domain.BlocosViagens
{
    public class BlocoViagem : Entity<BlocoViagemId>, IAggregateRoot
    {
        public BlocoTrabalho bloco { get; set; }
        public Viagem viagem { get; set; }

        public BlocoViagem() {}

        public BlocoViagem(BlocoTrabalho bloco, Viagem viagem) {
            this.Id = new BlocoViagemId(Guid.NewGuid());
            this.bloco=bloco;
            this.viagem=viagem;
        }
    }
}