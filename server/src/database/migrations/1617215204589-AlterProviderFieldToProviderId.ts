import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterProviderFieldToProviderId1617215204589
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("appointments", "provider");

    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider_id",
        type: "uuid",
        isNullable: true,
      })
    );
    await queryRunner.createForeignKey(
      "appointments",
      new TableForeignKey({
        name: "FKProvider",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["provider_id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("appointments", "FKProvider");

    await queryRunner.dropColumn("appointments", "provider_id");

    await queryRunner.addColumn(
      "appointments",
      new TableColumn({
        name: "provider",
        type: "varchar",
      })
    );
  }
}
