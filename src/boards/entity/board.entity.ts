import { EntityBase } from "src/base.Entity";
import { BoardLike } from "src/boards_likes/entity/board_like.entity";
import { Category } from "src/categories/entity/category.entity";
import { Comment } from "src/comments/entity/comment.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Board extends EntityBase {

    @Column()
    title:string;

    @Column()
    content:string;

    @Column()
    categoryId:number;

    @ManyToOne(() => User, user => user.boards)
    user:User;

    @ManyToOne(() => Category, category => category.boards)
    category:Category;

    @OneToMany(() => Comment, comments => comments.board)
    comments:Comment[];

    @OneToMany(() => BoardLike, boardlikes => boardlikes.board)
    boardLikes:BoardLike[];


}