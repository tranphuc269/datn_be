import { MigrationInterface, QueryRunner } from "typeorm";

export class profile1668052128809 implements MigrationInterface {
    name = 'profile1668052128809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`work_amounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`work_amount\` double NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`time_keepings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`create_date\` datetime NOT NULL, \`morning_join\` datetime NOT NULL, \`morning_leave\` datetime NOT NULL, \`afternoon_join\` datetime NOT NULL, \`afternoon_leave\` datetime NOT NULL, \`odd_time\` int NOT NULL, \`work_amount_id\` int NOT NULL, \`work_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paid_amounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`amount\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`overtime_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_person_id\` int NOT NULL, \`related_person_id\` int NULL, \`approver_person_id\` int NOT NULL, \`ticket_status_id\` int NOT NULL, \`project_id\` int NOT NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`reason\` text NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status_name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supplement_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_person_id\` int NOT NULL, \`related_person_id\` int NULL, \`approver_person_id\` int NOT NULL, \`ticket_status_id\` int NOT NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`reason\` text NOT NULL, \`paid_type_id\` int NOT NULL, \`is_ot\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_personals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`birthday\` datetime NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`religion_id\` int NULL, \`ethnicity_id\` int NULL, \`marital_status_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_works\` (\`id\` int NOT NULL AUTO_INCREMENT, \`workEmail\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`tax_number\` varchar(255) CHARACTER SET "utf8" NULL, \`health_insurance_number\` varchar(255) CHARACTER SET "utf8" NULL, \`health_insurance_place\` varchar(255) CHARACTER SET "utf8" NULL, \`join_date\` datetime NOT NULL, \`end_date\` datetime NULL, \`bhxh_date\` datetime NULL, \`bhyt_date\` datetime NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`company_name\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`religion_id\` int NULL, \`ethnicity_id\` int NULL, \`marital_status_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`account_status\` int NOT NULL, \`email\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`paid_amount\` int NULL, \`user_personal\` int NULL, \`user_work\` int NULL, UNIQUE INDEX \`REL_765e6e96f746be07e7de627468\` (\`paid_amount\`), UNIQUE INDEX \`REL_e73079c75eff0289cd2478b68f\` (\`user_personal\`), UNIQUE INDEX \`REL_0c43b28075895eb7c448e15214\` (\`user_work\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paid_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`coefficient_salary\` double NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`paid_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`create_person_id\` int NOT NULL, \`related_person_id\` int NULL, \`approver_person_id\` int NOT NULL, \`substitute_person_id\` int NULL, \`ticket_status_id\` int NOT NULL, \`start_time\` datetime NOT NULL, \`end_time\` datetime NOT NULL, \`reason\` text NOT NULL, \`paid_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contact_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`city\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`state\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`address_1\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`address_2\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`country_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket_users\` (\`ticket_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_fa955b3f6a89ebf833a0267bad\` (\`ticket_id\`), INDEX \`IDX_83a290a01df2f54d4047746957\` (\`user_id\`), PRIMARY KEY (\`ticket_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_336fe00dcea1a1337d4f04eaf4a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_a2bf6b49782038129e369e5f808\` FOREIGN KEY (\`work_amount_id\`) REFERENCES \`work_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_1b8ef99493d18c0470125c306d5\` FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_6afefd3715c5e37d0e057d473f4\` FOREIGN KEY (\`create_person_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` ADD CONSTRAINT \`FK_3ef0b43d22f2301087cf70e2f05\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` ADD CONSTRAINT \`FK_ad28ed8e5738ae960b03ab8349d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` ADD CONSTRAINT \`FK_679f6a43f41c0d64eff00d49f00\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_765e6e96f746be07e7de6274685\` FOREIGN KEY (\`paid_amount\`) REFERENCES \`paid_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_e1678ae67f74e32d981a83f5487\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_4c8f5ebdf3ac569f048c5f19d4e\` FOREIGN KEY (\`paid_type_id\`) REFERENCES \`paid_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_a959ab34f37c09edae597d5cbec\` FOREIGN KEY (\`ticket_status_id\`) REFERENCES \`ticket_statuses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` ADD CONSTRAINT \`FK_fa955b3f6a89ebf833a0267bad3\` FOREIGN KEY (\`ticket_id\`) REFERENCES \`overtime_tickets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` ADD CONSTRAINT \`FK_83a290a01df2f54d4047746957a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_users\` DROP FOREIGN KEY \`FK_83a290a01df2f54d4047746957a\``);
        await queryRunner.query(`ALTER TABLE \`ticket_users\` DROP FOREIGN KEY \`FK_fa955b3f6a89ebf833a0267bad3\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_a959ab34f37c09edae597d5cbec\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_4c8f5ebdf3ac569f048c5f19d4e\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_e1678ae67f74e32d981a83f5487\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_765e6e96f746be07e7de6274685\``);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` DROP FOREIGN KEY \`FK_679f6a43f41c0d64eff00d49f00\``);
        await queryRunner.query(`ALTER TABLE \`supplement_tickets\` DROP FOREIGN KEY \`FK_ad28ed8e5738ae960b03ab8349d\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_3ef0b43d22f2301087cf70e2f05\``);
        await queryRunner.query(`ALTER TABLE \`overtime_tickets\` DROP FOREIGN KEY \`FK_6afefd3715c5e37d0e057d473f4\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_1b8ef99493d18c0470125c306d5\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_a2bf6b49782038129e369e5f808\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_336fe00dcea1a1337d4f04eaf4a\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_83a290a01df2f54d4047746957\` ON \`ticket_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fa955b3f6a89ebf833a0267bad\` ON \`ticket_users\``);
        await queryRunner.query(`DROP TABLE \`ticket_users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`contact_users\``);
        await queryRunner.query(`DROP TABLE \`paid_tickets\``);
        await queryRunner.query(`DROP TABLE \`paid_types\``);
        await queryRunner.query(`DROP INDEX \`REL_0c43b28075895eb7c448e15214\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_e73079c75eff0289cd2478b68f\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_765e6e96f746be07e7de627468\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_works\``);
        await queryRunner.query(`DROP TABLE \`user_personals\``);
        await queryRunner.query(`DROP TABLE \`supplement_tickets\``);
        await queryRunner.query(`DROP TABLE \`ticket_statuses\``);
        await queryRunner.query(`DROP TABLE \`overtime_tickets\``);
        await queryRunner.query(`DROP TABLE \`paid_amounts\``);
        await queryRunner.query(`DROP TABLE \`time_keepings\``);
        await queryRunner.query(`DROP TABLE \`work_types\``);
        await queryRunner.query(`DROP TABLE \`work_amounts\``);
    }

}
