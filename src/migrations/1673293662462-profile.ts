import { MigrationInterface, QueryRunner } from "typeorm";

export class profile1673293662462 implements MigrationInterface {
    name = 'profile1673293662462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`national\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`religion\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`ethnicity\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`marital_status\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`national_id\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`religion_id\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`ethnicity_id\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`marital_status_id\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`marital_status_id\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`ethnicity_id\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`religion_id\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`national_id\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`marital_status\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`ethnicity\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`religion\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`national\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
    }

}
