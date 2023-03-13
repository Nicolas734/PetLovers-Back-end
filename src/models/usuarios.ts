import { DataTypes } from 'sequelize';
import db from "../config/db"

const Usuarios = db.define('usuarios',{
    id:{
        type: DataTypes.INTEGER
    },
    nome: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    senha: {
        type: DataTypes.STRING
    }
})

export default Usuarios;
