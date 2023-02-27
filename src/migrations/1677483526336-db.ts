import { MigrationInterface, QueryRunner } from "typeorm";

export class db1677483526336 implements MigrationInterface {
    name = 'db1677483526336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reset_key\` varchar(255) CHARACTER SET "utf8" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reset_key\``);
    }

}
