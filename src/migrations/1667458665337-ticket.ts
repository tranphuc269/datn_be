import { MigrationInterface, QueryRunner } from "typeorm";

export class ticket1667458665337 implements MigrationInterface {
    name = 'ticket1667458665337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_5ee5ed8d14cb6033f9457fd0d82\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP COLUMN \`paid_type_id\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`substitute_person_id\` \`substitute_person_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`substitute_person_id\` \`substitute_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` CHANGE \`related_person_id\` \`related_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD \`paid_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_5ee5ed8d14cb6033f9457fd0d82\` FOREIGN KEY (\`paid_type_id\`) REFERENCES \`paid_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
