using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using metadataviagens.Domain.Tripulantes;
using metadataviagens.Domain.Viagens;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Infrastructure.Tripulantes;
using metadataviagens.Infrastructure.Viaturas;
using metadataviagens.Infrastructure.Viagens;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Infrastructure.ServicosViatura;
using metadataviagens.Infrastructure.ServicosTripulante;
using metadataviagens.Infrastructure.Users;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Domain.ServicosTripulante;
using metadataviagens.Domain.Users;

namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {

        public DbSet<Tripulante> Tripulantes {get; set; }

        public DbSet<Viatura> Viaturas { get; set; }

        public DbSet<Viagem> Viagens {get; set; }

        public DbSet<BlocoTrabalho> BlocosTrabalho {get; set; }

        public DbSet<BlocoViagem> BlocosViagem {get; set; }

        public DbSet<ServicoViatura> ServicosViatura {get; set; }

        public DbSet<ServicoTripulante> ServicosTripulante {get; set; }

        public DbSet<User> Users {get; set; }

        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TripulanteEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ViaturaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ViagemEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BlocoTrabalhoEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new BlocoViagemEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ServicoViaturaEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ServicoTripulanteEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        }
    }
}