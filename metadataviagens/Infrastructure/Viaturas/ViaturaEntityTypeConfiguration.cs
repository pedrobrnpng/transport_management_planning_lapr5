using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.Viaturas;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.Viaturas
{
    internal class ViaturaEntityTypeConfiguration : IEntityTypeConfiguration<Viatura>
    {

        public void Configure(EntityTypeBuilder<Viatura> builder)
        {
            builder.ToTable("Viaturas", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.tipoViaturaId);
            builder.HasAlternateKey(b => b.vin);
            builder.HasAlternateKey(b => b.matricula);
        }

    }
}
