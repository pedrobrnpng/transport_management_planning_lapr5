using System.Linq;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Domain.Shared;
using metadataviagens.Domain.BlocosTrabalho;
using System.Collections.Generic;
using System;

namespace metadataviagens.Mappers
{
    public class ServicoTripulanteMapper
    {
        public static ServicoTripulante toDomain(Tripulante tripulante, string nome, string cor, List<BlocoTrabalho> blocosTrabalho) {
            return new ServicoTripulante(tripulante,nome,new Cor(cor),blocosTrabalho);
        }

        public static ServicoTripulanteDto toDTO(ServicoTripulante servicoTripulante)
        {
            List<int> blocs= servicoTripulante.blocosTrabalho.Select(b => b.codigo).ToList();
            return new ServicoTripulanteDto(servicoTripulante.Id.AsGuid(),
            servicoTripulante.tripulante.numeroMecanografico.ToString(),
            servicoTripulante.nome,
            servicoTripulante.cor.toString(),blocs);
        }
    }
}