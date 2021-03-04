using System;
using metadataviagens.Domain.Viagens;

namespace metadataviagens.Mappers.Viagens
{
    public class ViagemMapper
    {
        public static Viagem toDomain(CriarViagemDto dto) {
            return new Viagem(dto.codigo, dto.horaInicio, new LinhaId(dto.linha), new PercursoId(dto.idPercurso));
        }

        public static ViagemDto toDTO(Viagem viagem)
        {
            return new ViagemDto(viagem.Id.AsGuid(), viagem.codigo, viagem.horaInicio, viagem.linha, viagem.idPercurso);
        }
    }
}