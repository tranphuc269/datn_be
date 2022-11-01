import { MigrationInterface, QueryRunner } from "typeorm";

export class test1667115655710 implements MigrationInterface {
    name = 'test1667115655710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passport_obj\` \`passport_obj\` varchar(20) CHARACTER SET "utf8" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`passport_obj\` \`passport_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
