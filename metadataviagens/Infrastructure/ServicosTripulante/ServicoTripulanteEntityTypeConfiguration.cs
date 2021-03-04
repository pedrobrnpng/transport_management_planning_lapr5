using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.ServicosTripulante;
using DDDSample1.Infrastructure;
using metadataviagens.Domain.BlocosTrabalho;

namespace metadataviagens.Infrastructure.ServicosTripulante
{
    internal class ServicoTripulanteEntityTypeConfiguration : IEntityTypeConfiguration<ServicoTripulante>
    {
          public void Configure(EntityTypeBuilder<ServicoTripulante> builder)
        {
            builder.ToTable("ServicosTripulante", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasOne(b => b.tripulante);
            builder.HasMany<BlocoTrabalho>(b => b.blocosTrabalho);
            builder.OwnsOne(b => b.cor);
            builder.HasAlternateKey(b => b.nome);

        }
    }
}