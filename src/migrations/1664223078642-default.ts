import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664223078642 implements MigrationInterface {
    name = 'default1664223078642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_274c5ebb3c595f5a56f1f8fba9a"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "REL_274c5ebb3c595f5a56f1f8fba9"`);
        await queryRunner.query(`ALTER TABLE "members" DROP COLUMN "role_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "REL_274c5ebb3c595f5a56f1f8fba9" UNIQUE ("role_id")`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_274c5ebb3c595f5a56f1f8fba9a" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
