import { MigrationInterface, QueryRunner } from "typeorm";

export class db1677315611724 implements MigrationInterface {
    name = 'db1677315611724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keeping_lists\` ADD \`month\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keeping_lists\` DROP COLUMN \`month\``);
    }

}
