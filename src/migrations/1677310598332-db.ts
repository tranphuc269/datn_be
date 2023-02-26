import { MigrationInterface, QueryRunner } from "typeorm";

export class db1677310598332 implements MigrationInterface {
    name = 'db1677310598332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_143412839ec4cc8c471ba8531f1\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP COLUMN \`time_keeping_list\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_c4dad404733155ae5aff23068df\` FOREIGN KEY (\`timekeeping_list_id\`) REFERENCES \`time_keeping_lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_c4dad404733155ae5aff23068df\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD \`time_keeping_list\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_143412839ec4cc8c471ba8531f1\` FOREIGN KEY (\`time_keeping_list\`) REFERENCES \`time_keeping_lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
