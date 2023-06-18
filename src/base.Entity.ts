import { Column, PrimaryGeneratedColumn } from "typeorm";

export class EntityBase {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    created_at:string;

    @Column()
    updated_at:string;

}