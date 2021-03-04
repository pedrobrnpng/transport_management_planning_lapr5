// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Metadata.Builders;
// using DDDSample1.Domain.Categories;

// namespace DDDSample1.Infrastructure.Categories
// {
//     internal class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
//     {
//         public void Configure(EntityTypeBuilder<Category> builder)
//         {
//             //builder.ToTable("Categories", SchemaNames.DDDSample1);
//             builder.HasKey(b => b.Id);
//             //builder.Property<bool>("_active").HasColumnName("Active");
//         }
//     }
// }