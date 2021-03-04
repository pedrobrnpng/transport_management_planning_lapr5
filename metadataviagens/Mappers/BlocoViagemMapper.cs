using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.Viagens;
using System;

namespace metadataviagens.Mappers
{
    public class BlocoViagemMapper
    {
        public static BlocoViagem toDomain(BlocoTrabalho bloco, Viagem viagem) {
            return new BlocoViagem(bloco, viagem);
        }

        public static BlocoViagemDto toDTO(BlocoViagem blocoViagem)
        {
            return new BlocoViagemDto(blocoViagem.Id.AsGuid(), blocoViagem.bloco.codigo, blocoViagem.viagem.codigo);
        }
    }
}