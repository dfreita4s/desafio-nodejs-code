import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664279485807 implements MigrationInterface {
    name = 'default1664279485807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "members_role_roles" ("membersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_006c2cb00dbf3718d19bd112a6a" PRIMARY KEY ("membersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1e235c5c213d036fd14cc9100b" ON "members_role_roles" ("membersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5d90f4b9e259b2a9d9e627442" ON "members_role_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "members_role_roles" ADD CONSTRAINT "FK_1e235c5c213d036fd14cc9100b6" FOREIGN KEY ("membersId") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "members_role_roles" ADD CONSTRAINT "FK_d5d90f4b9e259b2a9d9e627442a" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "members_role_roles" DROP CONSTRAINT "FK_d5d90f4b9e259b2a9d9e627442a"`);
        await queryRunner.query(`ALTER TABLE "members_role_roles" DROP CONSTRAINT "FK_1e235c5c213d036fd14cc9100b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5d90f4b9e259b2a9d9e627442"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e235c5c213d036fd14cc9100b"`);
        await queryRunner.query(`DROP TABLE "members_role_roles"`);
    }

}
