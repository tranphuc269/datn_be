import { MigrationInterface, QueryRunner } from "typeorm";

export class timeKeeping1667300468240 implements MigrationInterface {
    name = 'timeKeeping1667300468240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP COLUMN \`morning_left\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP COLUMN \`afternoon_left\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD \`morning_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD \`afternoon_leave\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP COLUMN \`afternoon_leave\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` DROP COLUMN \`morning_leave\``);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD \`afternoon_left\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` ADD \`morning_left\` datetime NOT NULL`);
    }

}
