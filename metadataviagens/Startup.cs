using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DDDSample1.Infrastructure;
using DDDSample1.Infrastructure.Shared;
using metadataviagens.Services.ServicosTripulante;
using metadataviagens.Infrastructure.Tripulantes;
using metadataviagens.Infrastructure.Viagens;
using metadataviagens.Services.Viagens;
using metadataviagens.Infrastructure.BlocosTrabalho;
using metadataviagens.Infrastructure.BlocosViagens;
using metadataviagens.Infrastructure.ServicosViatura;
using metadataviagens.Infrastructure.Users;
using metadataviagens.Services.TiposTripulante;
using DDDSample1.Domain.Shared;
using metadataviagens.Services.Tripulantes;
using metadataviagens.Domain.Viagens;
using metadataviagens.Domain.BlocosTrabalho;
using metadataviagens.Services.BlocosTrabalho;
using metadataviagens.Domain.BlocosViagens;
using metadataviagens.Services.BlocosViagens;
using metadataviagens.Domain.ServicosViatura;
using metadataviagens.Services.ServicosViatura;
using metadataviagens.Infrastructure.ServicosTripulante;
using metadataviagens.Infrastructure.Viaturas;
using metadataviagens.Services.TiposViatura;
using metadataviagens.Domain.Viaturas;
using metadataviagens.Domain.Users;
using metadataviagens.Services.Users;
using metadataviagens.Services.Viaturas;
using metadataviagens.Services.ImportarDados;
using metadataviagens.Services.ReadData;

namespace DDDSample1
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("MyAllowSpecificOrigins",
                builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                });
            });

            services.AddDbContext<DDDSample1DbContext>(opt =>
              opt.UseSqlServer(Configuration.GetConnectionString("AzureDb"))
                .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("MyAllowSpecificOrigins");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });


        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ITripulanteRepository, TripulanteRepository>();
            services.AddTransient<ITripulanteService,TripulanteService>();
            services.AddTransient<ITipoTripulanteService,TipoTripulanteService>();

            services.AddTransient<IViagemRepository, ViagemRepository>();
            services.AddTransient<IViagemService, ViagemService>();
            services.AddTransient<IPercursoService, PercursoService>();
            services.AddTransient<ILinhaService, LinhaService>();

            services.AddTransient<IBlocoTrabalhoRepository, BlocoTrabalhoRepository>();
            services.AddTransient<IBlocoTrabalhoService, BlocoTrabalhoService>();
            services.AddTransient<INoService, NoService>();

            services.AddTransient<IBlocoViagemRepository, BlocoViagemRepository>();
            services.AddTransient<IBlocoViagemService, BlocoViagemService>();

            services.AddTransient<IServicoViaturaRepository, ServicoViaturaRepository>();
            services.AddTransient<IServicoViaturaService, ServicoViaturaService>();

            services.AddTransient<IServicoTripulanteRepository, ServicoTripulanteRepository>();
            services.AddTransient<IServicosTripulanteService, ServicoTripulanteService>();

            services.AddTransient<IViaturaRepository, ViaturaRepository>();
            services.AddTransient<ITipoViaturaService,TipoViaturaService>();
            services.AddTransient<IViaturaService, ViaturaService>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IPercursoService, PercursoService>();
            services.AddTransient<ILinhaService, LinhaService>();

            services.AddTransient<IImportarDadosService, ImportarDadosService>();
            services.AddTransient<IReadFile, ReadFile>();
            services.AddTransient<IReadBlocosTrabalho, ReadBlocosTrabalho>();
            services.AddTransient<IReadViagens, ReadViagens>();
            services.AddTransient<IReadServicosViatura, ReadServicosViatura>();
            services.AddTransient<IReadServicosTripulante, ReadServicosTripulante>();
        }
    }
}
