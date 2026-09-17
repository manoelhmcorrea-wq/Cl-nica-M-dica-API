import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";
import {Role} from "../utils/roles"

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn("uuid")
    id!: number;

    @Column("varchar")
    nome!: string;

    @Column({ type:"varchar", unique: true})
    email!: string;

    @Column("varchar")
    senha!: string;

    @Column({type:"enum",enum: Role})
    role!: Role;

    @CreateDateColumn()
    criadoEm!: Date
}