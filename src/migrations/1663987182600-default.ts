import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663987182600 implements MigrationInterface {
    name = 'default1663987182600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "members" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "birthday" date NOT NULL, "role_id" integer, CONSTRAINT "REL_274c5ebb3c595f5a56f1f8fba9" UNIQUE ("role_id"), CONSTRAINT "PK_28b53062261b996d9c99fa12404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "departments" ("id" SERIAL NOT NULL, "name" text NOT NULL, "memberId" integer, CONSTRAINT "PK_839517a681a86bb84cbcc6a1e9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "members" ADD CONSTRAINT "FK_274c5ebb3c595f5a56f1f8fba9a" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "departments" ADD CONSTRAINT "FK_d63bb96912faaecd90bcf26ca46" FOREIGN KEY ("memberId") REFERENCES "members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "departments" DROP CONSTRAINT "FK_d63bb96912faaecd90bcf26ca46"`);
        await queryRunner.query(`ALTER TABLE "members" DROP CONSTRAINT "FK_274c5ebb3c595f5a56f1f8fba9a"`);
        await queryRunner.query(`DROP TABLE "departments"`);
        await queryRunner.query(`DROP TABLE "members"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
