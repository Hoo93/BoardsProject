import { Cipher } from "crypto";
import { EntityBase } from "src/base.Entity";
import { Board } from "src/boards/entity/board.entity";
import { CommentLike } from "src/comments_like/entity/comment_like.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends EntityBase {

    @Column()
    boardId:number;

    @Column()
    userId:number;
    
    @Column()
    content:string;
    
    @ManyToOne(() => User, user => user.comments)
    user:User;

    @ManyToOne(() => Board, board => board.comments)
    board:Board;

    @OneToMany(() => CommentLike, commentLikes => commentLikes.comment)
    commentLikes:CommentLike[];

    



}