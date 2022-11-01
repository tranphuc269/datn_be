import { MigrationInterface, QueryRunner } from "typeorm";

export class timeKeeping1667299678559 implements MigrationInterface {
    name = 'timeKeeping1667299678559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`work_amounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`work_amount\` double NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`time_keepings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`create_date\` datetime NOT NULL, \`morning_join\` datetime NOT NULL, \`morning_left\` datetime NOT NULL, \`afternoon_join\` datetime NOT NULL, \`afternoon_left\` datetime NOT NULL, \`odd_time\` int NOT NULL, \`work_amount_id\` int NOT NULL, \`work_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`status_account\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`birthday\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`identification_id_obj\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`passport_obj\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` DROP COLUMN \`national_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status_account\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`account_status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_336fe00dcea1a1337d4f04eaf4a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_a2bf6b49782038129e369e5f808\` FOREIGN KEY (\`work_amount_id\`) REFERENCES \`work_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_1b8ef99493d18c0470125c306d5\` FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_1b8ef99493d18c0470125c306d5\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_a2bf6b49782038129e369e5f808\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_336fe00dcea1a1337d4f04eaf4a\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`birthday\` \`birthday\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`account_status\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`status_account\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`national_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`gender\` tinyint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`phone_number\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`email\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`passport_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`birthday\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`last_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`first_name\` varchar(50) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`password\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`paid_tickets\` ADD \`status_account\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`work_types\``);
        await queryRunner.query(`DROP TABLE \`time_keepings\``);
        await queryRunner.query(`DROP TABLE \`work_amounts\``);
    }

}
