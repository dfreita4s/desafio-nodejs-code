import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";

@Entity('departments')
export class Department {

    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text', /*unique:true*/ })
    name: string

}