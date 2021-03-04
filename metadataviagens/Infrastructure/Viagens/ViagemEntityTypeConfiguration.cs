using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.Viagens;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.Viagens
{
    internal class ViagemEntityTypeConfiguration : IEntityTypeConfiguration<Viagem>
    {
        public void Configure(EntityTypeBuilder<Viagem> builder)
        {
            builder.ToTable("Viagens", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.codigo);
        }
    }
}