import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        length : 40,
        nullable : true,
        unique : true
    })
    email: string;

    @Column({
        length : 15,
        nullable : false
    })
    nick: string;

    @Column({
        length : 100,
        nullable : true
    })
    password: string;

    @Column({
        length : 10,
        nullable : false,
        default : 'local'
    })
    provider: string;

    @Column({
        length : 30,
        nullable : true
    })
    snsId: string;
}