import { MigrationInterface, QueryRunner } from "typeorm";

export class db1677485090696 implements MigrationInterface {
    name = 'db1677485090696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`expired_key\` datetime NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`expired_key\``);
    }

}
