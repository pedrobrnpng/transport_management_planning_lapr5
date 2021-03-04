using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.ServicosViatura;
using DDDSample1.Infrastructure;
using metadataviagens.Domain.BlocosTrabalho;

namespace metadataviagens.Infrastructure.ServicosViatura
{
    internal class ServicoViaturaEntityTypeConfiguration: IEntityTypeConfiguration<ServicoViatura>
    {
        public void Configure(EntityTypeBuilder<ServicoViatura> builder)
        {
            builder.ToTable("ServicosViatura", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.OwnsOne(b => b.cor);
            builder.HasOne(b => b.viatura);
            builder.HasMany<BlocoTrabalho>(b => b.blocos);
            builder.HasAlternateKey(b => b.nome);
        }
    }
}