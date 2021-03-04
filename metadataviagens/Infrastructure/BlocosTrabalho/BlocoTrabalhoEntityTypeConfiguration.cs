using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.BlocosTrabalho;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.BlocosTrabalho
{
    public class BlocoTrabalhoEntityTypeConfiguration : IEntityTypeConfiguration<BlocoTrabalho>
    {
        public void Configure(EntityTypeBuilder<BlocoTrabalho> builder)
        {
            builder.ToTable("BlocosTrabalho", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.codigo);
        }
    }
}