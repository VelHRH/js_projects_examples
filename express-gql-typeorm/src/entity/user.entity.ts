import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ nullable: false })
    email: string
}