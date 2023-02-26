import { MigrationInterface, QueryRunner } from "typeorm";

export class db1677310519154 implements MigrationInterface {
    name = 'db1677310519154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_38deb2e9ab10bdcbeab35e8d30f\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`timeKeeping_list\` \`time_keeping_list\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_143412839ec4cc8c471ba8531f1\` FOREIGN KEY (\`time_keeping_list\`) REFERENCES \`time_keeping_lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP FOREIGN KEY \`FK_143412839ec4cc8c471ba8531f1\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`time_keeping_list\` \`timeKeeping_list\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD CONSTRAINT \`FK_38deb2e9ab10bdcbeab35e8d30f\` FOREIGN KEY (\`timeKeeping_list\`) REFERENCES \`time_keeping_lists\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
