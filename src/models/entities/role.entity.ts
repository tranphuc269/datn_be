import { BaseEntity } from "src/shared/entities/base.entity";
import {
    Column, CreateDateColumn, DeleteDateColumn, Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('role')
export class Role implements BaseEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
    id: number;
    @Column({
        name: 'name',
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    name: string
}