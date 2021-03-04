using System.Linq;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Domain.Shared;
using metadataviagens.Domain.BlocosTrabalho;
using System.Collections.Generic;
using System;

namespace metadataviagens.Mappers
{
    public class ServicoViaturaMapper
    {
        public static ServicoViatura toDomain(string nome, string cor, string depots, Viatura viatura, List<BlocoTrabalho> blocos) {
            return new ServicoViatura(nome, new Cor(cor), depots, viatura, blocos);
        }

        public static ServicoViaturaDto toDTO(ServicoViatura servicoViatura)
        {
            List<int> blocos= servicoViatura.blocos.Select(b => b.codigo).ToList();
            return new ServicoViaturaDto(servicoViatura.Id.AsGuid(), servicoViatura.nome, servicoViatura.cor.toString(), servicoViatura.depots, servicoViatura.viatura.matricula, blocos);
        }
    }
}