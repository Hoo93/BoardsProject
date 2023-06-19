import { EntityBase } from "src/base.Entity";
import { Board } from "src/boards/entity/board.entity";
import { BoardLike } from "src/boards_likes/entity/board_like.entity";
import { Comment } from "src/comments/entity/comment.entity";
import { CommentLike } from "src/comments_like/entity/comment_like.entity";
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

    @OneToMany(() => Comment, comment => comment.user)
    comments:Comment[];

    @OneToMany(() => BoardLike, boardLikes => boardLikes.user)
    boardLikes:BoardLike[];

    @OneToMany(() => CommentLike, commentLikes => commentLikes.user)
    commentLikes:CommentLike[];
}
