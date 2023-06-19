import { EntityBase } from "src/base.Entity";
import { BoardsController } from "src/boards/boards.controller";
import { Board } from "src/boards/entity/board.entity";
import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Category extends EntityBase {

    @Column()
    name:string;

    @ManyToOne(() => Board, board => board.category)
    boards:Board[];

}