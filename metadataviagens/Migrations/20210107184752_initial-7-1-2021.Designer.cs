﻿// <auto-generated />
using System;
using DDDSample1.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DDDNetCore.Migrations
{
    [DbContext(typeof(DDDSample1DbContext))]
    [Migration("20210107184752_initial-7-1-2021")]
    partial class initial712021
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("metadataviagens.Domain.BlocosTrabalho.BlocoTrabalho", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ServicoTripulanteId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ServicoViaturaId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("active")
                        .HasColumnType("bit");

                    b.Property<int>("codigo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<bool>("ctt")
                        .HasColumnType("bit");

                    b.Property<int>("horaFim")
                        .HasColumnType("int");

                    b.Property<int>("horaInicio")
                        .HasColumnType("int");

                    b.Property<string>("noFim")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("noInicio")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasAlternateKey("codigo");

                    b.HasIndex("ServicoTripulanteId");

                    b.HasIndex("ServicoViaturaId");

                    b.ToTable("BlocosTrabalho", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.BlocosViagens.BlocoViagem", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("blocoId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("viagemId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("blocoId");

                    b.HasIndex("viagemId");

                    b.ToTable("BlocosViagem", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosTripulante.ServicoTripulante", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("tripulanteId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasAlternateKey("nome");

                    b.HasIndex("tripulanteId");

                    b.ToTable("ServicosTripulante", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosViatura.ServicoViatura", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("depots")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("viaturaId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasAlternateKey("nome");

                    b.HasIndex("viaturaId");

                    b.ToTable("ServicosViatura", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.Tripulantes.Tripulante", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("dataEntrada")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("dataNascimento")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("dataSaida")
                        .HasColumnType("datetime2");

                    b.Property<int>("nif")
                        .HasColumnType("int");

                    b.Property<string>("nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("numeroCartaoCidadao")
                        .HasColumnType("int");

                    b.Property<int>("numeroMecanografico")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasAlternateKey("nif");

                    b.HasAlternateKey("numeroCartaoCidadao");

                    b.HasAlternateKey("numeroMecanografico");

                    b.ToTable("Tripulantes", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.Users.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("func")
                        .HasColumnType("int");

                    b.Property<string>("nome")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasAlternateKey("email");

                    b.ToTable("Users", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.Viagens.Viagem", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("codigo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("horaInicio")
                        .HasColumnType("datetime2");

                    b.Property<string>("idPercurso")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("linha")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasAlternateKey("codigo");

                    b.ToTable("Viagens", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.Viaturas.Viatura", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("dataEntrada")
                        .HasColumnType("datetime2");

                    b.Property<string>("matricula")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("vin")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasAlternateKey("matricula");

                    b.HasAlternateKey("vin");

                    b.ToTable("Viaturas", "dbo");
                });

            modelBuilder.Entity("metadataviagens.Domain.BlocosTrabalho.BlocoTrabalho", b =>
                {
                    b.HasOne("metadataviagens.Domain.ServicosTripulante.ServicoTripulante", null)
                        .WithMany("blocosTrabalho")
                        .HasForeignKey("ServicoTripulanteId");

                    b.HasOne("metadataviagens.Domain.ServicosViatura.ServicoViatura", null)
                        .WithMany("blocos")
                        .HasForeignKey("ServicoViaturaId");
                });

            modelBuilder.Entity("metadataviagens.Domain.BlocosViagens.BlocoViagem", b =>
                {
                    b.HasOne("metadataviagens.Domain.BlocosTrabalho.BlocoTrabalho", "bloco")
                        .WithMany()
                        .HasForeignKey("blocoId");

                    b.HasOne("metadataviagens.Domain.Viagens.Viagem", "viagem")
                        .WithMany()
                        .HasForeignKey("viagemId");

                    b.Navigation("bloco");

                    b.Navigation("viagem");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosTripulante.ServicoTripulante", b =>
                {
                    b.HasOne("metadataviagens.Domain.Tripulantes.Tripulante", "tripulante")
                        .WithMany()
                        .HasForeignKey("tripulanteId");

                    b.OwnsOne("metadataviagens.Domain.Shared.Cor", "cor", b1 =>
                        {
                            b1.Property<string>("ServicoTripulanteId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("cor")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("ServicoTripulanteId");

                            b1.ToTable("ServicosTripulante");

                            b1.WithOwner()
                                .HasForeignKey("ServicoTripulanteId");
                        });

                    b.Navigation("cor");

                    b.Navigation("tripulante");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosViatura.ServicoViatura", b =>
                {
                    b.HasOne("metadataviagens.Domain.Viaturas.Viatura", "viatura")
                        .WithMany()
                        .HasForeignKey("viaturaId");

                    b.OwnsOne("metadataviagens.Domain.Shared.Cor", "cor", b1 =>
                        {
                            b1.Property<string>("ServicoViaturaId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("cor")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("ServicoViaturaId");

                            b1.ToTable("ServicosViatura");

                            b1.WithOwner()
                                .HasForeignKey("ServicoViaturaId");
                        });

                    b.Navigation("cor");

                    b.Navigation("viatura");
                });

            modelBuilder.Entity("metadataviagens.Domain.Tripulantes.Tripulante", b =>
                {
                    b.OwnsOne("metadataviagens.Domain.Tripulantes.TipoTripulanteId", "tipoTripulanteId", b1 =>
                        {
                            b1.Property<string>("TripulanteId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("id")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("TripulanteId");

                            b1.ToTable("Tripulantes");

                            b1.WithOwner()
                                .HasForeignKey("TripulanteId");
                        });

                    b.OwnsOne("metadataviagens.Domain.Tripulantes.Turno", "turno", b1 =>
                        {
                            b1.Property<string>("TripulanteId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("turno")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("TripulanteId");

                            b1.ToTable("Tripulantes");

                            b1.WithOwner()
                                .HasForeignKey("TripulanteId");
                        });

                    b.Navigation("tipoTripulanteId");

                    b.Navigation("turno");
                });

            modelBuilder.Entity("metadataviagens.Domain.Viaturas.Viatura", b =>
                {
                    b.OwnsOne("metadataviagens.Domain.Viaturas.TipoViaturaId", "tipoViaturaId", b1 =>
                        {
                            b1.Property<string>("ViaturaId")
                                .HasColumnType("nvarchar(450)");

                            b1.Property<string>("id")
                                .HasColumnType("nvarchar(max)");

                            b1.HasKey("ViaturaId");

                            b1.ToTable("Viaturas");

                            b1.WithOwner()
                                .HasForeignKey("ViaturaId");
                        });

                    b.Navigation("tipoViaturaId");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosTripulante.ServicoTripulante", b =>
                {
                    b.Navigation("blocosTrabalho");
                });

            modelBuilder.Entity("metadataviagens.Domain.ServicosViatura.ServicoViatura", b =>
                {
                    b.Navigation("blocos");
                });
#pragma warning restore 612, 618
        }
    }
}
