import { MigrationInterface, QueryRunner } from "typeorm";

export class profile1668012114016 implements MigrationInterface {
    name = 'profile1668012114016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_personals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`birthday\` datetime NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`religion_id\` int NULL, \`ethnicity_id\` int NULL, \`marital_status_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_works\` (\`id\` int NOT NULL AUTO_INCREMENT, \`workEmail\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`tax_number\` varchar(255) CHARACTER SET "utf8" NULL, \`health_insurance_number\` varchar(255) CHARACTER SET "utf8" NULL, \`health_insurance_place\` varchar(255) CHARACTER SET "utf8" NULL, \`join_date\` datetime NOT NULL, \`end_date\` datetime NULL, \`bhxh_date\` datetime NULL, \`bhyt_date\` datetime NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`company_name\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`religion_id\` int NULL, \`ethnicity_id\` int NULL, \`marital_status_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`city\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`state\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`address_1\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`address_2\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`country_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`national_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`passport_obj\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`identification_id_obj\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_personal\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_e73079c75eff0289cd2478b68f\` (\`user_personal\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`user_work\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_0c43b28075895eb7c448e15214\` (\`user_work\`)`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_e73079c75eff0289cd2478b68f\` ON \`users\` (\`user_personal\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0c43b28075895eb7c448e15214\` ON \`users\` (\`user_work\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`DROP INDEX \`REL_0c43b28075895eb7c448e15214\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_e73079c75eff0289cd2478b68f\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_0c43b28075895eb7c448e15214\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_work\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_e73079c75eff0289cd2478b68f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_personal\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`first_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`birthday\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`passport_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`national_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`contact_users\``);
        await queryRunner.query(`DROP TABLE \`user_works\``);
        await queryRunner.query(`DROP TABLE \`user_personals\``);
    }

}
