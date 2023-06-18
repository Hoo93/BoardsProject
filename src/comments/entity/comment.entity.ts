import { EntityBase } from "src/base.Entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends EntityBase {
    
    @Column()
    user_id:number;

    @Column()
    board_id:number;

    @Column()
    content:string;

}