using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.BlocosViagens;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.BlocosViagens
{
    public class BlocoViagemEntityTypeConfiguration : IEntityTypeConfiguration<BlocoViagem>
    {
        public void Configure(EntityTypeBuilder<BlocoViagem> builder)
        {
            builder.ToTable("BlocosViagem", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasOne(b => b.bloco);
            builder.HasOne(b => b.viagem);
        }
    }
}