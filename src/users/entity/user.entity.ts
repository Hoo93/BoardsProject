import { EntityBase } from "src/base.Entity";
import { Board } from "src/boards/entity/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username','nickname'])
export class User extends EntityBase {
    
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    nickname: string;

    @OneToMany(()=> Board,board => board.user)
    boards:Board[];
}
