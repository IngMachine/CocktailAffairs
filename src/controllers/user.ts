import {Request, Response} from "express";

import {
    getUsersService,
    getUserService,
    updateUserService,
    deleteUserService
} from "../services/user";

import {handleHttp} from "../utils/error.handle";


const getUsersController = async(req: Request, res: Response) => {
    try {
        const responseUsers = await getUsersService();
        return res.status(200).json(responseUsers);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_GET_USERS', err);
    }
}

const getUserController = async({params}: Request, res: Response) => {
    try {
        const { id } = params;
        const responseUser = await getUserService(id);
        return res.status(200).json(responseUser);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_USER_BY_ID', err);
    }
}

const updateUserController = async({params, body}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseUser = await updateUserService(id, body)
        return res.status(200).json(responseUser)
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_USER', err)
    }
}

const deleteUserController = async({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseUser = await deleteUserService(id);
        if (responseUser) {
            return res.status(200).json(responseUser);
        } else {
            return res.status(404).json({
                ok: false,
                msg: "User not found"
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_USER', err);
    }
}

export {
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController
}