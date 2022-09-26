import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./Department";
import { Role } from "./Role";


@Entity('members')
export class Member {

    @PrimaryGeneratedColumn()
    id: string

    @Column({ type: 'text' })
    name: string

    @Column({ type: 'text' })
    email: string

    @Column({ type: 'text' })
    password: string

    @Column({ type: 'date' })
    birthday: Date

    @ManyToMany(()=> Department)
    @JoinTable()
    departments: Department[]

    @ManyToMany(()=>Role)
    @JoinColumn()
    role: Role
}