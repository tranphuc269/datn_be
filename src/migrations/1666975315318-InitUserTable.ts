import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUserTable1666975315318 implements MigrationInterface {
  name = 'InitUserTable1666975315318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`status_account\` int NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`first_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`birthday\` datetime NOT NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`email\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`paid_tickets\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`status_account\` int NOT NULL, \`password\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`first_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`last_name\` varchar(50) CHARACTER SET "utf8" NOT NULL, \`birthday\` datetime NOT NULL, \`identification_id_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`passport_obj\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`email\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`phone_number\` varchar(20) CHARACTER SET "utf8" NOT NULL, \`gender\` tinyint NOT NULL, \`national_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`ticket_statuses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) CHARACTER SET "utf8" NOT NULL, \`code\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`paid_tickets\` ADD CONSTRAINT \`FK_e1678ae67f74e32d981a83f5487\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`paid_tickets\` DROP FOREIGN KEY \`FK_e1678ae67f74e32d981a83f5487\``
    );
    await queryRunner.query(`DROP TABLE \`ticket_statuses\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
    await queryRunner.query(`DROP TABLE \`paid_tickets\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}

