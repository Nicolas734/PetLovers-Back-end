import {google} from "googleapis";
import { OAuth2Client } from 'google-auth-library';
import {Readable } from "stream";
import * as dotenv from "dotenv"



dotenv.config();
const GOOGLE_DRIVE_CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET
const GOOGLE_DRIVE_REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN


class Drive{
    private client;

    constructor(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string){
        this.client = this.createDriveClient(clientId, clientSecret, redirectUri, refreshToken);
    }

    public createDriveClient(clientId: string, clientSecret: string, redirectUri: string, refreshToken: string) {
        const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        client.setCredentials({ refresh_token: refreshToken });
        return google.drive({
            version: 'v3',
            auth: client,
        });
    }

    public async createFolder(folderName:string){
        try{
            return this.client.files.create({
                resource: {
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder',
                },
                fields: 'id, name',
            })
        }catch(error){
            console.error(error)
            throw error
        }
    }

    public async searchFolder(folderName:string){
        try {
            const folders = this.client.files.list({
                    q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}' and trashed=false`,
                    fields: 'files(id, name, createdTime)',
            });
            return folders;
        } catch (error) {
            console.error(`Erro ao buscar pasta ${folderName}:`, error);
            throw error;
        }
    };

    public async sendFileFromDrive(filename:string, mimetype:string, fileContent:string, folderId:string){
        const fileMetadata = {
            name: filename,
            parents: [folderId] // ID da pasta onde o arquivo será salvo
        };
        const media = {
            mimeType: mimetype,
            body: Readable.from(fileContent)
        };
        try {
            const response = await this.client.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id, name'
            });
            return response;
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}



export default new Drive(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI, GOOGLE_DRIVE_REFRESH_TOKEN);