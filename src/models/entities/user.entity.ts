import { BaseEntity } from "src/shared/entities/base.entity";
import {
    Column, CreateDateColumn, DeleteDateColumn, Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('user')
export class User implements BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        name: 'name',
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    name: string
    @Column({
        name: 'email',
        type: 'nvarchar',
        length: 255,
        charset: 'utf8'
    })
    email: string
    @Column({
        name: 'phone_number',
        type: 'nvarchar',
        length: 20,
        charset: 'utf8'
    })
    phone: string
    @Column({
        name: 'gender',
        type: 'tinyint',
    })
    gender: number;
}