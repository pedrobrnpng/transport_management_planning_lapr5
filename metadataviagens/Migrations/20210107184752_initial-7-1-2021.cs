using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class initial712021 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Tripulantes",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    numeroMecanografico = table.Column<int>(type: "int", nullable: false),
                    nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dataNascimento = table.Column<DateTime>(type: "datetime2", nullable: false),
                    numeroCartaoCidadao = table.Column<int>(type: "int", nullable: false),
                    nif = table.Column<int>(type: "int", nullable: false),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    tipoTripulanteId_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    turno_turno = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dataEntrada = table.Column<DateTime>(type: "datetime2", nullable: false),
                    dataSaida = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tripulantes", x => x.Id);
                    table.UniqueConstraint("AK_Tripulantes_nif", x => x.nif);
                    table.UniqueConstraint("AK_Tripulantes_numeroCartaoCidadao", x => x.numeroCartaoCidadao);
                    table.UniqueConstraint("AK_Tripulantes_numeroMecanografico", x => x.numeroMecanografico);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nome = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    func = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.UniqueConstraint("AK_Users_email", x => x.email);
                });

            migrationBuilder.CreateTable(
                name: "Viagens",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    codigo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    horaInicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    linha = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    idPercurso = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viagens", x => x.Id);
                    table.UniqueConstraint("AK_Viagens_codigo", x => x.codigo);
                });

            migrationBuilder.CreateTable(
                name: "Viaturas",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    matricula = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    vin = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    tipoViaturaId_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dataEntrada = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Viaturas", x => x.Id);
                    table.UniqueConstraint("AK_Viaturas_matricula", x => x.matricula);
                    table.UniqueConstraint("AK_Viaturas_vin", x => x.vin);
                });

            migrationBuilder.CreateTable(
                name: "ServicosTripulante",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    tripulanteId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    nome = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    cor_cor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicosTripulante", x => x.Id);
                    table.UniqueConstraint("AK_ServicosTripulante_nome", x => x.nome);
                    table.ForeignKey(
                        name: "FK_ServicosTripulante_Tripulantes_tripulanteId",
                        column: x => x.tripulanteId,
                        principalSchema: "dbo",
                        principalTable: "Tripulantes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServicosViatura",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    nome = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    cor_cor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    depots = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    viaturaId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServicosViatura", x => x.Id);
                    table.UniqueConstraint("AK_ServicosViatura_nome", x => x.nome);
                    table.ForeignKey(
                        name: "FK_ServicosViatura_Viaturas_viaturaId",
                        column: x => x.viaturaId,
                        principalSchema: "dbo",
                        principalTable: "Viaturas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BlocosTrabalho",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    codigo = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    horaInicio = table.Column<int>(type: "int", nullable: false),
                    horaFim = table.Column<int>(type: "int", nullable: false),
                    noInicio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noFim = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ctt = table.Column<bool>(type: "bit", nullable: false),
                    active = table.Column<bool>(type: "bit", nullable: false),
                    ServicoTripulanteId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ServicoViaturaId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlocosTrabalho", x => x.Id);
                    table.UniqueConstraint("AK_BlocosTrabalho_codigo", x => x.codigo);
                    table.ForeignKey(
                        name: "FK_BlocosTrabalho_ServicosTripulante_ServicoTripulanteId",
                        column: x => x.ServicoTripulanteId,
                        principalSchema: "dbo",
                        principalTable: "ServicosTripulante",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BlocosTrabalho_ServicosViatura_ServicoViaturaId",
                        column: x => x.ServicoViaturaId,
                        principalSchema: "dbo",
                        principalTable: "ServicosViatura",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BlocosViagem",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    blocoId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    viagemId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlocosViagem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlocosViagem_BlocosTrabalho_blocoId",
                        column: x => x.blocoId,
                        principalSchema: "dbo",
                        principalTable: "BlocosTrabalho",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_BlocosViagem_Viagens_viagemId",
                        column: x => x.viagemId,
                        principalSchema: "dbo",
                        principalTable: "Viagens",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlocosTrabalho_ServicoTripulanteId",
                schema: "dbo",
                table: "BlocosTrabalho",
                column: "ServicoTripulanteId");

            migrationBuilder.CreateIndex(
                name: "IX_BlocosTrabalho_ServicoViaturaId",
                schema: "dbo",
                table: "BlocosTrabalho",
                column: "ServicoViaturaId");

            migrationBuilder.CreateIndex(
                name: "IX_BlocosViagem_blocoId",
                schema: "dbo",
                table: "BlocosViagem",
                column: "blocoId");

            migrationBuilder.CreateIndex(
                name: "IX_BlocosViagem_viagemId",
                schema: "dbo",
                table: "BlocosViagem",
                column: "viagemId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicosTripulante_tripulanteId",
                schema: "dbo",
                table: "ServicosTripulante",
                column: "tripulanteId");

            migrationBuilder.CreateIndex(
                name: "IX_ServicosViatura_viaturaId",
                schema: "dbo",
                table: "ServicosViatura",
                column: "viaturaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlocosViagem",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "BlocosTrabalho",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Viagens",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ServicosTripulante",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "ServicosViatura",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Tripulantes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Viaturas",
                schema: "dbo");
        }
    }
}
