import { MigrationInterface, QueryRunner } from "typeorm";

export class profile1673285662609 implements MigrationInterface {
    name = 'profile1673285662609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b237f8219ff6ce4f42b36a61ff3\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_personal\` \`user_personal\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_work\` \`user_work\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`contact_user\` \`contact_user\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_works\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b237f8219ff6ce4f42b36a61ff3\` FOREIGN KEY (\`contact_user\`) REFERENCES \`contact_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b237f8219ff6ce4f42b36a61ff3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_0c43b28075895eb7c448e15214c\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_e73079c75eff0289cd2478b68ff\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`contact_user\` \`contact_user\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_work\` \`user_work\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`user_personal\` \`user_personal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b237f8219ff6ce4f42b36a61ff3\` FOREIGN KEY (\`contact_user\`) REFERENCES \`contact_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_0c43b28075895eb7c448e15214c\` FOREIGN KEY (\`user_work\`) REFERENCES \`user_works\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_e73079c75eff0289cd2478b68ff\` FOREIGN KEY (\`user_personal\`) REFERENCES \`user_personals\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`code\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` DROP COLUMN \`status_name\``);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`status_name\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`code\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ticket_statuses\` ADD \`name\` varchar(255) CHARACTER SET "utf8" COLLATE "utf8_general_ci" NOT NULL`);
    }

}
