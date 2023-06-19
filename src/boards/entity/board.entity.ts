import { Cipher } from "crypto";
import { EntityBase } from "src/base.Entity";
import { Category } from "src/categories/entity/category.entity";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Board extends EntityBase {

    @ManyToOne(() => Category, category => category.boards)
    category:Category;

    @Column()
    title:string;

    @Column()
    content:string;

    @ManyToOne(() => User, user => user.boards)
    user:User;

}