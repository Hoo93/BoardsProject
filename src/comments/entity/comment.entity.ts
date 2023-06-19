import { EntityBase } from "src/base.Entity";
import { Board } from "src/boards/entity/board.entity";
import { CommentLike } from "src/comments_like/entity/comment_like.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends EntityBase {
    
    @ManyToOne(() => User, user => user.comments)
    user:User;

    @ManyToOne(() => Board, board => board.comments)
    board:Board;

    @OneToMany(() => CommentLike, commentLikes => commentLikes.comment)
    commentLikes:CommentLike[];

    @Column()
    content:string;



}