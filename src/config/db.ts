import * as typeorm from "typeorm"
import * as dotenv from "dotenv";
import TiposUsuario from "../models/tipoUsuario";
import Usuarios from "../models/usuarios";

dotenv.config();
// const URI = process.env.URI || '';

const databaseConection = async () => {
    await typeorm.createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456789',
        database: 'petlovers',
        synchronize: true,
        logging: false,
        entities: [
            Usuarios, TiposUsuario
        ]
    }).then(async (connection)=>{
        await connection.synchronize()
    });
};

export default databaseConection;