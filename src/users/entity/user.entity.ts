import { EntityBase } from "src/base.Entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends EntityBase {
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    nickname: string;
}
