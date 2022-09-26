import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text' })
    name: string

}