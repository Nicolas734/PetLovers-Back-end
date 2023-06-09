import * as dotenv from "dotenv";
import swaggerAutogen from 'swagger-autogen';

dotenv.config();

const PORT = process.env.PORT || 5000

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/index.ts'];

const doc = {
    info: {
        title: 'Api - PetLovers',
        description: 'API criada para o projeto da materia programação para dispositivos moveis',
        version: '1.0.0',
    },
    host: `localhost:${PORT}`,
    basePath: '/',
    schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
