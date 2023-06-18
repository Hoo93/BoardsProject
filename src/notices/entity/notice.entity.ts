import { EntityBase } from "src/base.Entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Notice extends EntityBase {
    
    @Column()
    notice_type:NoticeType;

    @Column()
    user_id:number;

    @Column()
    board_like_id:number;

    @Column()
    comment_like_id:number;

    @Column()
    is_read:boolean;

    @Column()
    read_at:string;

} 

export enum NoticeType {
    "COMMENTS"="comments",
    "BOARDS"="boards"
}