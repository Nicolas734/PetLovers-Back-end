import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import TiposUsuario from "./tipoUsuario";

@Entity()
class Usuarios{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ nullable:false })
    nome!: string;
    @Column({ unique: true, nullable: false })
    email!: string;
    @Column({ nullable:false })
    senha!: string;
    @ManyToOne(() => TiposUsuario, (tipoUsuario) => tipoUsuario.id)
    @JoinColumn({ name: 'id_tipo_usuario' })
    id_tipo_usuario!: TiposUsuario
};

export default Usuarios;
