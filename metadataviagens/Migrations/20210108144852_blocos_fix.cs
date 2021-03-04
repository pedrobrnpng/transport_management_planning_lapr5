using Microsoft.EntityFrameworkCore.Migrations;

namespace DDDNetCore.Migrations
{
    public partial class blocos_fix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_BlocosTrabalho_codigo",
                schema: "dbo",
                table: "BlocosTrabalho");

            migrationBuilder.DropColumn(
                name: "codigo",
                schema: "dbo",
                table: "BlocosTrabalho");
            
            migrationBuilder.AddColumn<int>(
                name: "codigo",
                schema: "dbo",
                table: "BlocosTrabalho",
                type: "int",
                nullable: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_BlocosTrabalho_codigo",
                schema: "dbo",
                table: "BlocosTrabalho",
                column: "codigo");

            // migrationBuilder.AlterColumn<int>(
            //     name: "codigo",
            //     schema: "dbo",
            //     table: "BlocosTrabalho",
            //     type: "int",
            //     nullable: false,
            //     oldClrType: typeof(int),
            //     oldType: "int")
            //     .OldAnnotation("SqlServer:Identity", "1, 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_BlocosTrabalho_codigo",
                schema: "dbo",
                table: "BlocosTrabalho");

            migrationBuilder.DropColumn(
                name: "codigo",
                schema: "dbo",
                table: "BlocosTrabalho");

            migrationBuilder.AddColumn<int>(
                name: "codigo",
                schema: "dbo",
                table: "BlocosTrabalho",
                type: "int",
                nullable: false);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_BlocosTrabalho_codigo",
                schema: "dbo",
                table: "BlocosTrabalho",
                column: "codigo");

            // migrationBuilder.AlterColumn<int>(
            //     name: "codigo",
            //     schema: "dbo",
            //     table: "BlocosTrabalho",
            //     type: "int",
            //     nullable: false,
            //     oldClrType: typeof(int),
            //     oldType: "int")
            //     .Annotation("SqlServer:Identity", "1, 1");
        }
    }
}
