using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.Tripulantes;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.Tripulantes
{
    internal class TripulanteEntityTypeConfiguration : IEntityTypeConfiguration<Tripulante>
    {
        public void Configure(EntityTypeBuilder<Tripulante> builder)
        {
            builder.ToTable("Tripulantes", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.tipoTripulanteId);
            builder.OwnsOne(b => b.turno);
            builder.HasAlternateKey(b => b.numeroMecanografico);
            builder.HasAlternateKey(b => b.numeroCartaoCidadao);
            builder.HasAlternateKey(b => b.nif);
        }
    }
}