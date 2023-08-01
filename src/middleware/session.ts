import {NextFunction, Response} from "express";
import {verifyToken} from "../utils/jwt.handle";
import {RequestExt} from "../interfaces/req-ext.interface";

const checkJWT = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };
        if( !isUser ) {
            res.status(401).send('NO_TIENES_UN_JWT_VALIDO');
        } else {
            req.user = isUser;
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(400).send("SESSION_NO_VALIDA")
    }
}

export {
    checkJWT
}