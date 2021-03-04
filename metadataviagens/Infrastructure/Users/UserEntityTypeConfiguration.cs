using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using metadataviagens.Domain.Users;
using DDDSample1.Infrastructure;

namespace metadataviagens.Infrastructure.Users
{
    public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            builder.HasAlternateKey(b => b.email);
        }
    }
}