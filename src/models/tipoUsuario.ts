import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
class TiposUsuario{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ nullable:false })
    tipo!: string;
};


export default TiposUsuario
