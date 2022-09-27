import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664304116835 implements MigrationInterface {
    name = 'default1664304116835'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "UQ_8681da666ad9699d568b3e91064" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "UQ_8681da666ad9699d568b3e91064"`);
    }

}
