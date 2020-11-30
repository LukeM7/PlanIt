using Microsoft.EntityFrameworkCore.Migrations;

namespace PlanIt.Migrations
{
    public partial class fixed_foreign_keys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Calendar_User_User_Id",
                table: "Calendar");

            migrationBuilder.DropForeignKey(
                name: "FK_Category_Calendar_Calender_Id",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Entry_Category_Category_ModelCategory_Id",
                table: "Entry");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Category_Category_Id",
                table: "Event");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Entry_Entry_Id",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Event_Category_Id",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Event_Entry_Id",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Entry_Category_ModelCategory_Id",
                table: "Entry");

            migrationBuilder.DropIndex(
                name: "IX_Category_Calender_Id",
                table: "Category");

            migrationBuilder.DropIndex(
                name: "IX_Calendar_User_Id",
                table: "Calendar");

            migrationBuilder.DropColumn(
                name: "Entry_Id",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "Category_ModelCategory_Id",
                table: "Entry");

            migrationBuilder.DropColumn(
                name: "Calender_Id",
                table: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "Category_Id",
                table: "Event",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255) CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category_ModelCategory_Id",
                table: "Event",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Calendar_ModelCalendar_Id",
                table: "Category",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "User_Id",
                table: "Calendar",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255) CHARACTER SET utf8mb4",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Event_Category_ModelCategory_Id",
                table: "Event",
                column: "Category_ModelCategory_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Calendar_ModelCalendar_Id",
                table: "Category",
                column: "Calendar_ModelCalendar_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Calendar_Calendar_ModelCalendar_Id",
                table: "Category",
                column: "Calendar_ModelCalendar_Id",
                principalTable: "Calendar",
                principalColumn: "Calendar_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Category_Category_ModelCategory_Id",
                table: "Event",
                column: "Category_ModelCategory_Id",
                principalTable: "Category",
                principalColumn: "Category_Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Category_Calendar_Calendar_ModelCalendar_Id",
                table: "Category");

            migrationBuilder.DropForeignKey(
                name: "FK_Event_Category_Category_ModelCategory_Id",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Event_Category_ModelCategory_Id",
                table: "Event");

            migrationBuilder.DropIndex(
                name: "IX_Category_Calendar_ModelCalendar_Id",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "Category_ModelCategory_Id",
                table: "Event");

            migrationBuilder.DropColumn(
                name: "Calendar_ModelCalendar_Id",
                table: "Category");

            migrationBuilder.AlterColumn<string>(
                name: "Category_Id",
                table: "Event",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Entry_Id",
                table: "Event",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Category_ModelCategory_Id",
                table: "Entry",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Calender_Id",
                table: "Category",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "User_Id",
                table: "Calendar",
                type: "varchar(255) CHARACTER SET utf8mb4",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Event_Category_Id",
                table: "Event",
                column: "Category_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Event_Entry_Id",
                table: "Event",
                column: "Entry_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Entry_Category_ModelCategory_Id",
                table: "Entry",
                column: "Category_ModelCategory_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Category_Calender_Id",
                table: "Category",
                column: "Calender_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Calendar_User_Id",
                table: "Calendar",
                column: "User_Id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Calendar_User_User_Id",
                table: "Calendar",
                column: "User_Id",
                principalTable: "User",
                principalColumn: "User_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Category_Calendar_Calender_Id",
                table: "Category",
                column: "Calender_Id",
                principalTable: "Calendar",
                principalColumn: "Calendar_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Entry_Category_Category_ModelCategory_Id",
                table: "Entry",
                column: "Category_ModelCategory_Id",
                principalTable: "Category",
                principalColumn: "Category_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Category_Category_Id",
                table: "Event",
                column: "Category_Id",
                principalTable: "Category",
                principalColumn: "Category_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Event_Entry_Entry_Id",
                table: "Event",
                column: "Entry_Id",
                principalTable: "Entry",
                principalColumn: "Entry_Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
