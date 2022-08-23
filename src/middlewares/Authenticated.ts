import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: String
}

export function Authenticated(
    req: Request, res: Response, next: NextFunction
){
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //Validar token
        const { sub } = verify(
            token,
            process.env.JWT_Secret
        ) as Payload;

        //ID do token no request
        req.user_id = sub;
        
    } catch(err) {
        return res.status(401).end();
    }
}