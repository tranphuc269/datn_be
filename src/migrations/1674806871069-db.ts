import { MigrationInterface, QueryRunner } from "typeorm";

export class db1674806871069 implements MigrationInterface {
    name = 'db1674806871069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_a2bf6b49782038129e369e5f808\` ON \`time_keepings\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_amount\` \`work_amount_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`identification_id_obj\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`passport_obj\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`identification_id_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user_personals\` ADD \`place_identification_ID\` varchar(20) CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`bhxh_rate\` varchar(20) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`leave_reason\` longtext CHARACTER SET "utf8" NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contact_users\` DROP COLUMN \`country_id\``);
        await queryRunner.query(`ALTER TABLE \`contact_users\` ADD \`country_id\` varchar(20) CHARACTER SET "utf8" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`contact_users\` DROP COLUMN \`country_id\``);
        await queryRunner.query(`ALTER TABLE \`contact_users\` ADD \`country_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`leave_reason\``);
        await queryRunner.query(`ALTER TABLE \`user_works\` DROP COLUMN \`bhxh_rate\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`place_identification_ID\``);
        await queryRunner.query(`ALTER TABLE \`user_personals\` DROP COLUMN \`identification_id_date\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`passport_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user_works\` ADD \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_amount_id\` \`work_amount\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_a2bf6b49782038129e369e5f808\` ON \`time_keepings\` (\`work_amount\`)`);
    }

}
