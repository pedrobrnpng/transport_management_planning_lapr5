using metadataviagens.Domain.Viaturas;

namespace metadataviagens.Mappers.Viaturas
{
    public class ViaturaMapper
    {
        public static Viatura toDomain(CriarViaturaDto dto)
        {
            return new Viatura(dto.matricula, dto.tipoViaturaId, dto.vin, dto.dataEntrada);
        }

        public static ViaturaDto toDTO(Viatura viatura)
        {
            return new ViaturaDto(viatura.Id.AsGuid(), viatura.matricula,
                viatura.tipoViaturaId.toString(), viatura.vin, viatura.dataEntrada);
        }
    }
}