import {Request, Response} from "express";

import {
    getUsersService,
    getUserService,
    getIsAdminByIdUserService,
    updateUserService,
    deleteUserService
} from "../services/user";

import {handleHttp} from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";
import {MessageErrorsEnum} from "../constant/messageOfErrors";


const getUsersController = async(req: Request, res: Response) => {
    try {
        const responseUsers = await getUsersService();
        return res.status(200).json(responseUsers);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_GET_USERS', err);
    }
}

const getUserByIdController = async({params, user}: RequestExt, res: Response) => {
    try {
        const { id } = params;
        if ( id === user?.id || await getIsAdminByIdUserService(user?.id )) {
            const responseUser = await getUserService(id);
            return res.status(200).json(responseUser);
        } else {
            return res.status(401).json({
                ok: false,
                msg: MessageErrorsEnum.UserNotPermitted
            });
        }
    } catch (err) {
        handleHttp(res, 'ERROR_GET_USER_BY_ID', err);
    }
}

const updateUserController = async({params, body, user}: RequestExt, res: Response) => {
    try {
        const {id} = params;
        delete body.password;
        delete body.email;
        if ( id === user?.id ) {
            if ( !await getIsAdminByIdUserService(user.id) ) {
                delete body.role;
            }
            const responseUser = await updateUserService(id, body);
            return res.status(200).json(responseUser);
        } else {
            if(await getIsAdminByIdUserService(user?.id )){
                const responseUser = await updateUserService(id, body);
                return res.status(200).json(responseUser);
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: MessageErrorsEnum.UserNotPermitted
                });
            }
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_USER', err)
    }
}

const deleteUserController = async({params}: Request, res: Response) => {
    try {
        const {id} = params;
        if ( await getIsAdminByIdUserService(id) ){
            return res.status(401).json({
                ok: false,
                msg: MessageErrorsEnum.UserNotPermitted
            });
        } else {
            const responseUser = await deleteUserService(id);
            if (responseUser) {
                return res.status(200).json(responseUser);
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: MessageErrorsEnum.UserNotFound
                })
            }
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_USER', err);
    }
}

export {
    getUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
}