using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class viagens_fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Viagens_codigo",
                schema: "dbo",
                table: "Viagens");

            migrationBuilder.DropColumn(
                name: "codigo",
                schema: "dbo",
                table: "Viagens");
            
            migrationBuilder.AddColumn<int>(
                name: "codigo",
                schema: "dbo",
                table: "Viagens",
                type: "int",
                nullable: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Viagens_codigo",
                schema: "dbo",
                table: "Viagens",
                column: "codigo");

            // migrationBuilder.AlterColumn<int>(
            //     name: "codigo",
            //     schema: "dbo",
            //     table: "Viagens",
            //     type: "int",
            //     nullable: false,
            //     oldClrType: typeof(int),
            //     oldType: "int")
            //     .OldAnnotation("SqlServer:Identity", "1, 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_Viagens_codigo",
                schema: "dbo",
                table: "Viagens");

            migrationBuilder.DropColumn(
                name: "codigo",
                schema: "dbo",
                table: "Viagens");
            
            migrationBuilder.AddColumn<int>(
                name: "codigo",
                schema: "dbo",
                table: "Viagens",
                type: "int",
                nullable: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Viagens_codigo",
                schema: "dbo",
                table: "Viagens",
                column: "codigo");

            // migrationBuilder.AlterColumn<int>(
            //     name: "codigo",
            //     schema: "dbo",
            //     table: "Viagens",
            //     type: "int",
            //     nullable: false,
            //     oldClrType: typeof(int),
            //     oldType: "int")
            //     .Annotation("SqlServer:Identity", "1, 1");
        }
    }
}
