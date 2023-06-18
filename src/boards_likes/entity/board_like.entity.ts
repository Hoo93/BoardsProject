import { EntityBase } from "src/base.Entity";
import { Column, Entity } from "typeorm";

@Entity()
export class BoardLike extends EntityBase {

    @Column()
    user_id:number;

    @Column()
    board_id:number;

}