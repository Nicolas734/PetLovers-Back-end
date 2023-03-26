import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'BotoBrothers';

export const generateToken = async (dados: any) => {
    return jwt.sign(dados.toJSON(), JWT_SECRET);
};


export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization  || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Não autorizado....' });
    }

    try{
        const token = authorization.slice(7);
        const decoded = jwt.verify(token, JWT_SECRET);
        res.locals.jwtPayload = decoded;
    }catch(error){
        res.status(401).send({error:"Não autorizado...."}); 
    }

    next();
};
