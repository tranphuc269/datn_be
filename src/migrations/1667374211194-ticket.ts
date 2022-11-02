import { MigrationInterface, QueryRunner } from "typeorm";

export class ticket1667374211194 implements MigrationInterface {
    name = 'ticket1667374211194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`paid_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`coefficient_salary\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supplement_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_person_id\` int NOT NULL, \`related_person_id\` int NOT NULL, \`approver_person_id\` int NOT NULL, \`ticket_status_id\` int NOT NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`reason\` text NOT NULL, \`paid_type_id\` int NOT NULL, \`is_ot\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`overtime_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_person_id\` int NOT NULL, \`related_person_id\` int NOT NULL, \`approver_person_id\` int NOT NULL, \`ticket_status_id\` int NOT NULL, \`project_id\` int NOT NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`reason\` text NOT NULL, \`paid_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`create_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paid_amounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`amount\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_users\` (\`ticket_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_fa955b3f6a89ebf833a0267bad\` (\`ticket_id\`), INDEX \`IDX_83a290a01df2f54d4047746957\` (\`user_id\`), PRIMARY KEY (\`ticket_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`create_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`related_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`approver_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`substitute_person_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`ticket_status_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`start_time\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`end_time\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`reason\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`paid_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`paid_amount\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_765e6e96f746be07e7de627468\` (\`paid_amount\`)`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_e1678ae67f74e32d981a83f5487\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_765e6e96f746be07e7de627468\` ON \`users\` (\`paid_amount\`)`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_e1678ae67f74e32d981a83f5487\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_4c8f5ebdf3ac569f048c5f19d4e\` FOREIGN KEY (\`paid_type_id\`) REFERENCES \`paid_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_a959ab34f37c09edae597d5cbec\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` ADD CONSTRAINT \`FK_ad28ed8e5738ae960b03ab8349d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` ADD CONSTRAINT \`FK_679f6a43f41c0d64eff00d49f00\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_4d251656ded126112815fc197c7\` FOREIGN KEY (\`create_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_5ee5ed8d14cb6033f9457fd0d82\` FOREIGN KEY (\`paid_type_id\`) REFERENCES \`paid_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_3ef0b43d22f2301087cf70e2f05\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_765e6e96f746be07e7de6274685\` FOREIGN KEY (\`paid_amount\`) REFERENCES \`paid_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` ADD CONSTRAINT \`FK_fa955b3f6a89ebf833a0267bad3\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`overtime_tickets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` ADD CONSTRAINT \`FK_83a290a01df2f54d4047746957a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_users\` DROP FOREIGN KEY \`FK_83a290a01df2f54d4047746957a\``);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` DROP FOREIGN KEY \`FK_fa955b3f6a89ebf833a0267bad3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_765e6e96f746be07e7de6274685\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_3ef0b43d22f2301087cf70e2f05\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_5ee5ed8d14cb6033f9457fd0d82\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_4d251656ded126112815fc197c7\``);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` DROP FOREIGN KEY \`FK_679f6a43f41c0d64eff00d49f00\``);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` DROP FOREIGN KEY \`FK_ad28ed8e5738ae960b03ab8349d\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_a959ab34f37c09edae597d5cbec\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_4c8f5ebdf3ac569f048c5f19d4e\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_e1678ae67f74e32d981a83f5487\``);
        await queryRunner.query(`DROP INDEX \`REL_765e6e96f746be07e7de627468\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_e1678ae67f74e32d981a83f5487\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_765e6e96f746be07e7de627468\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`paid_amount\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`paid_type_id\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`reason\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`end_time\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`start_time\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`ticket_status_id\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`substitute_person_id\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`approver_person_id\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`related_person_id\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`create_person_id\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_83a290a01df2f54d4047746957\` ON \`ticket_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa955b3f6a89ebf833a0267bad\` ON \`ticket_users\``);
        await queryRunner.query(`DROP TABLE \`ticket_users\``);
        await queryRunner.query(`DROP TABLE \`paid_amounts\``);
        await queryRunner.query(`DROP TABLE \`overtime_tickets\``);
        await queryRunner.query(`DROP TABLE \`supplement_tickets\``);
        await queryRunner.query(`DROP TABLE \`paid_types\``);
    }

}
