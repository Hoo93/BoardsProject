import { EntityBase } from "src/base.Entity";
import { Comment } from "src/comments/entity/comment.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, Unique } from "typeorm";

@Entity()
export class CommentLike extends EntityBase {

    @Column('int')
    userId:number;

    @Column('int')
    commentId:number;

    @ManyToOne(() => User,user => user.commentLikes)
    user:User;

    @ManyToOne(() => Comment, comment => comment.commentLikes)
    comment:Comment;

}
