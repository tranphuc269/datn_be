import { MigrationInterface, QueryRunner } from "typeorm";

export class timeKeeping1667296668080 implements MigrationInterface {
    name = 'timeKeeping1667296668080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`work_amounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`work_amount\` double NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name_work_amount\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`time_keepings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`create_date\` datetime NOT NULL, \`morning_join\` datetime NOT NULL, \`morning_left\` datetime NOT NULL, \`afternoon_join\` datetime NOT NULL, \`afternoon_left\` datetime NOT NULL, \`odd_time\` int NOT NULL, \`work_amount_id\` int NOT NULL, \`work_type_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_336fe00dcea1a1337d4f04eaf4a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_a2bf6b49782038129e369e5f808\` FOREIGN KEY (\`work_amount_id\`) REFERENCES \`work_amounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_1b8ef99493d18c0470125c306d5\` FOREIGN KEY (\`work_type_id\`) REFERENCES \`work_types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_1b8ef99493d18c0470125c306d5\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_a2bf6b49782038129e369e5f808\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_336fe00dcea1a1337d4f04eaf4a\``);
        await queryRunner.query(`DROP TABLE \`time_keepings\``);
        await queryRunner.query(`DROP TABLE \`work_types\``);
        await queryRunner.query(`DROP TABLE \`work_amounts\``);
    }

}
