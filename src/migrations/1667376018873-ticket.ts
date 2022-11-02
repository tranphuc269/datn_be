import { MigrationInterface, QueryRunner } from "typeorm";

export class ticket1667376018873 implements MigrationInterface {
    name = 'ticket1667376018873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_4d251656ded126112815fc197c7\``);
        await queryRunner.query(`DROP INDEX \`IDX_765e6e96f746be07e7de627468\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP COLUMN \`create_id\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_6afefd3715c5e37d0e057d473f4\` FOREIGN KEY (\`create_person_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_6afefd3715c5e37d0e057d473f4\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD \`create_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_765e6e96f746be07e7de627468\` ON \`users\` (\`paid_amount\`)`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_4d251656ded126112815fc197c7\` FOREIGN KEY (\`create_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
