using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanIt.Migrations
{
    public partial class add_all_models : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "User_Id",
                table: "Checklist",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category_Id",
                table: "Checklist",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Calender_Id",
                table: "Category",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Calendar",
                columns: table => new
                {
                    Calendar_Id = table.Column<string>(nullable: false),
                    User_Id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Calendar", x => x.Calendar_Id);
                    table.ForeignKey(
                        name: "FK_Calendar_User_User_Id",
                        column: x => x.User_Id,
                        principalTable: "User",
                        principalColumn: "User_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Event",
                columns: table => new
                {
                    Event_Id = table.Column<string>(nullable: false),
                    Date = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    At_Time = table.Column<string>(nullable: true),
                    Duration = table.Column<string>(nullable: true),
                    Category_Id = table.Column<string>(nullable: true),
                    Entry_Id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Event", x => x.Event_Id);
                    table.ForeignKey(
                        name: "FK_Event_Category_Category_Id",
                        column: x => x.Category_Id,
                        principalTable: "Category",
                        principalColumn: "Category_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Entry",
                columns: table => new
                {
                    Entry_Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    Checklist_Id = table.Column<string>(nullable: true),
                    Event_Id = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entry", x => x.Entry_Id);
                    table.ForeignKey(
                        name: "FK_Entry_Checklist_Checklist_Id",
                        column: x => x.Checklist_Id,
                        principalTable: "Checklist",
                        principalColumn: "Checklist_Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Entry_Event_Event_Id",
                        column: x => x.Event_Id,
                        principalTable: "Event",
                        principalColumn: "Event_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Checklist_Category_Id",
                table: "Checklist",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Checklist_User_Id",
                table: "Checklist",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Calender_Id",
                table: "Category",
                column: "Calender_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_User_Id",
                table: "Calendar",
                column: "User_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Entry_Checklist_Id",
                table: "Entry",
                column: "Checklist_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Entry_Event_Id",
                table: "Entry",
                column: "Event_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Event_Category_Id",
                table: "Event",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Event_Entry_Id",
                table: "Event",
                column: "Entry_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Calendar_Calender_Id",
                table: "Category",
                column: "Calender_Id",
                principalTable: "Calendar",
                principalColumn: "Calendar_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Checklist_Category_Category_Id",
                table: "Checklist",
                column: "Category_Id",
                principalTable: "Category",
                principalColumn: "Category_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Checklist_User_User_Id",
                table: "Checklist",
                column: "User_Id",
                principalTable: "User",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Entry_Entry_Id",
                table: "Event",
                column: "Entry_Id",
                principalTable: "Entry",
                principalColumn: "Entry_Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Calendar_Calender_Id",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Checklist_Category_Category_Id",
                table: "Checklist");

            migrationBuilder.DropForeignKey(
                name: "FK_Checklist_User_User_Id",
                table: "Checklist");

            migrationBuilder.DropForeignKey(
                name: "FK_Entry_Event_Event_Id",
                table: "Entry");

            migrationBuilder.DropTable(
                name: "Calendar");

            migrationBuilder.DropTable(
                name: "Event");

            migrationBuilder.DropTable(
                name: "Entry");

            migrationBuilder.DropIndex(
                name: "IX_Checklist_Category_Id",
                table: "Checklist");

            migrationBuilder.DropIndex(
                name: "IX_Checklist_User_Id",
                table: "Checklist");

            migrationBuilder.DropIndex(
                name: "IX_Category_Calender_Id",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "Calender_Id",
                table: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "User_Id",
                table: "Checklist",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Category_Id",
                table: "Checklist",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
