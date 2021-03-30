import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1617069115155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "appointments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "provider",
            type: "varchar",
          },
          {
            name: "date",
            type: "timestamp with time zone",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("appointments");
  }
}
