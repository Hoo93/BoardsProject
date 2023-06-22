import { EntityBase } from "src/base.Entity";
import { Board } from "src/boards/entity/board.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class BoardLike extends EntityBase {

    @Column('int')
    userId:number;

    @Column('int')
    boardId:number;

    @ManyToOne(() => User,user => user.boardLikes)
    user:User;

    @ManyToOne(() => Board, board => board.boardLikes)
    board:Board;

}