import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text' })
    name: string

    @ManyToMany(()=>Member, member => member.role) //colocar many to many
    members: Member
}