import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

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

    @Column("varchar")
    role!: string;

    @CreateDateColumn()
    criadoEm!: Date
}