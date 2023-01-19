import { MigrationInterface, QueryRunner } from "typeorm";

export class timeKeepings1669102767075 implements MigrationInterface {
    name = 'timeKeepings1669102767075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_a2bf6b49782038129e369e5f808\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_1b8ef99493d18c0470125c306d5\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_amount_id\` \`work_amount_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_type_id\` \`work_type_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b237f8219ff6ce4f42b36a61ff3\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_personal\` \`user_personal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_work\` \`user_work\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`contact_user\` \`contact_user\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_a2bf6b49782038129e369e5f808\` FOREIGN KEY (\`work_amount_id\`) REFERENCES \`work_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_1b8ef99493d18c0470125c306d5\` FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_works\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b237f8219ff6ce4f42b36a61ff3\` FOREIGN KEY (\`contact_user\`) REFERENCES \`contact_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b237f8219ff6ce4f42b36a61ff3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_1b8ef99493d18c0470125c306d5\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_a2bf6b49782038129e369e5f808\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`contact_user\` \`contact_user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_work\` \`user_work\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_personal\` \`user_personal\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b237f8219ff6ce4f42b36a61ff3\` FOREIGN KEY (\`contact_user\`) REFERENCES \`contact_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_works\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_type_id\` \`work_type_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`work_amount_id\` \`work_amount_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_1b8ef99493d18c0470125c306d5\` FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_a2bf6b49782038129e369e5f808\` FOREIGN KEY (\`work_amount_id\`) REFERENCES \`work_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
