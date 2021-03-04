using System;
using metadataviagens.Domain.Tripulantes;

namespace metadataviagens.Mappers.Tripulantes
{
    public class TripulanteMapper
    {
        public static Tripulante toDomain(CriarTripulanteDto dto) {
            return new Tripulante(dto.numeroMecanografico,dto.nome,dto.dataNascimento,
                dto.numeroCartaoCidadao,dto.nif,new Turno(dto.turno),new TipoTripulanteId(dto.tipoTripulanteId),
                dto.dataEntrada,dto.dataSaida);
        }

        public static TripulanteDto toDTO(Tripulante tripulante)
        {
            return new TripulanteDto(tripulante.Id.AsGuid(),tripulante.numeroMecanografico, tripulante.nome, tripulante.dataNascimento,
                tripulante.numeroCartaoCidadao,tripulante.nif,
                tripulante.turno.toString(), tripulante.tipoTripulanteId.toString(),
                tripulante.dataEntrada,tripulante.dataSaida);
        }
    }
}