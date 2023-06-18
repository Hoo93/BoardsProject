import { EntityBase } from "src/base.Entity";
import { Column, Entity } from "typeorm";

@Entity()
export class CommentLike extends EntityBase {

    @Column()
    user_id:number;

    @Column()
    comment_id:number;

}