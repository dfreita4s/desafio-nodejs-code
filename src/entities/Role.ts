import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Member } from "./Member";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text' })
    name: string

    @OneToOne(()=>Member, member => member.role) //colocar many to many
    member: Member
}