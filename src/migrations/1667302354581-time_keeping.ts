import { MigrationInterface, QueryRunner } from "typeorm";

export class timeKeeping1667302354581 implements MigrationInterface {
    name = 'timeKeeping1667302354581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`odd_time\` \`odd_time\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_leave\` \`afternoon_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`afternoon_join\` \`afternoon_join\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_leave\` \`morning_leave\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`time_keepings\` CHANGE \`morning_join\` \`morning_join\` datetime NOT NULL`);
    }

}
