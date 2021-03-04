using metadataviagens.Domain.BlocosTrabalho;

namespace metadataviagens.Mappers.BlocosTrabalho
{
    public class BlocoTrabalhoMapper
    {
        public static BlocoTrabalho toDomain(int codigo, int horaInicio, int horaFim, string noInicio, string noFim, bool ctt) {
            return new BlocoTrabalho(codigo, horaInicio, horaFim, noInicio, noFim, ctt);
        }

        public static BlocoTrabalhoDto toDTO(BlocoTrabalho blocoTrabalho)
        {
            return new BlocoTrabalhoDto(blocoTrabalho.Id.AsGuid(), blocoTrabalho.codigo, blocoTrabalho.horaInicio, blocoTrabalho.horaFim, blocoTrabalho.noInicio,
                blocoTrabalho.noFim, blocoTrabalho.ctt);
        }
    }
}