import { Cipher } from "crypto";
import { EntityBase } from "src/base.Entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Board extends EntityBase {

    @Column()
    user_id:number;

    @Column()
    category_id:number;
    
    @Column()
    title:string;

    @Column()
    content:string;

}