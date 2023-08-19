import {NextFunction, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";

import {verifyToken} from "../utils/jwt.handle";
import {getUserService} from "../services/user";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

const checkJWT = (req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop();
        const isUser = verifyToken(`${jwt}`) as { id: string };
        if( !isUser ) {
            res.status(401).json({
                ok: false,
                msg: 'JWT invalid'
            });
        } else {
            req.user = isUser;
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(403).json({
            ok: false,
            msg: MessageErrorsEnum.SessionNoValid
        })
    }
}

const checkRolPermit = (roles: string[]) => async(req: RequestExt, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || null;
        const jwt = jwtByUser?.split(' ').pop();
        const {id} = verifyToken(`${jwt}`) as { id: string };

        const userService = await getUserService(id);

        const userServiceObj = userService!.toObject();

        const rolesUser = userServiceObj.role.map( rol => {
            return {
                ...rol,
                // @ts-ignore
                _id: rol._id.toString()
            }
        })

        const isIncluded = rolesUser.some(role => roles.map(rol => rol.toUpperCase()).includes(role.name));

        if(isIncluded) {
            next();
        } else {
            res.status(409).json({
                ok: false,
                msg: MessageErrorsEnum.UserNotPermitted
            })
        }
    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Talk with administration - Auth permit'
        })
    }
}


export {
    checkJWT,
    checkRolPermit
}