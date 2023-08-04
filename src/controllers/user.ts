import {Request, Response} from "express";

import {
    getUsersService,
    updateUserService,
    deleteUserService
} from "../services/user";

import {handleHttp} from "../utils/error.handle";
import {deleteCocktail} from "../services/cocktails";


const getUsersController = async(req: Request, res: Response) => {
    try {
        const responseUsers = await getUsersService();
        return res.status(200).json(responseUsers);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_GET_USERS', err);
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
        const responseCocktail = await deleteUserService(id);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_USER', err);
    }
}

export {
    getUsersController,
    updateUserController,
    deleteUserController
}