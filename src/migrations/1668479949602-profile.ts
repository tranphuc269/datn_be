import { MigrationInterface, QueryRunner } from "typeorm";

export class profile1668479949602 implements MigrationInterface {
    name = 'profile1668479949602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`company_name\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`national_id\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`religion_id\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`ethnicity_id\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`marital_status_id\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`first_name\` \`first_name\` varchar(50) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`last_name\` \`last_name\` varchar(50) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`identification_id_obj\` \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`gender\` \`gender\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`national_id\` \`national_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` CHANGE \`workEmail\` \`workEmail\` varchar(255) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` CHANGE \`identification_id_obj\` \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`city\` \`city\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`state\` \`state\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`address_1\` \`address_1\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`address_2\` \`address_2\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`phone_number\` \`phone_number\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`country_id\` \`country_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`country_id\` \`country_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`phone_number\` \`phone_number\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`address_2\` \`address_2\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`address_1\` \`address_1\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`state\` \`state\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` CHANGE \`city\` \`city\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` CHANGE \`identification_id_obj\` \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` CHANGE \`workEmail\` \`workEmail\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`national_id\` \`national_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`gender\` \`gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`identification_id_obj\` \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`last_name\` \`last_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` CHANGE \`first_name\` \`first_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`marital_status_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`ethnicity_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`religion_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`national_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`company_name\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`phone_number\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
