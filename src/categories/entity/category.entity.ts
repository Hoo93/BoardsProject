import { EntityBase } from "src/base.Entity";
import { Column, Entity, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Category extends EntityBase {

    @Column()
    name:string;

}