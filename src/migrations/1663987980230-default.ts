import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663987980230 implements MigrationInterface {
    name = 'default1663987980230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_d63bb96912faaecd90bcf26ca46"`);
        await queryRunner.query(`CREATE TABLE "members_departments_departments" ("membersId" integer NOT NULL, "departmentsId" integer NOT NULL, CONSTRAINT "PK_634a8d6af2c20faed391950c589" PRIMARY KEY ("membersId", "departmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_881dc169463f4da565dee53ef4" ON "members_departments_departments" ("membersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bbdeadc31775e3fb7b16a0955" ON "members_departments_departments" ("departmentsId") `);
        await queryRunner.query(`ALTER TABLE "departments" DROP COLUMN "memberId"`);
        await queryRunner.query(`ALTER TABLE "members_departments_departments" ADD CONSTRAINT "FK_881dc169463f4da565dee53ef48" FOREIGN KEY ("membersId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "members_departments_departments" ADD CONSTRAINT "FK_2bbdeadc31775e3fb7b16a09558" FOREIGN KEY ("departmentsId") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members_departments_departments" DROP CONSTRAINT "FK_2bbdeadc31775e3fb7b16a09558"`);
        await queryRunner.query(`ALTER TABLE "members_departments_departments" DROP CONSTRAINT "FK_881dc169463f4da565dee53ef48"`);
        await queryRunner.query(`ALTER TABLE "departments" ADD "memberId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bbdeadc31775e3fb7b16a0955"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_881dc169463f4da565dee53ef4"`);
        await queryRunner.query(`DROP TABLE "members_departments_departments"`);
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "FK_d63bb96912faaecd90bcf26ca46" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
