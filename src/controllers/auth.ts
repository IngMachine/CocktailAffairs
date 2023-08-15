import {Request, Response} from "express";

import {
    createUserService,
    loginUserService
} from "../services/auth";

import {handleHttp} from "../utils/error.handle";


const registerController = async ({body}: Request, res: Response) => {
    try {
        const responseUser = await createUserService(body);
        if ( responseUser.ok ) {
            res.status(201).json(responseUser);
        } else {
            res.status(400).json(responseUser);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_USER', err)
    }
}

const loginController = async ({body}: Request, res: Response) => {
    const responseUser = await loginUserService(body);
    if ( !responseUser.ok ) {
        res.status(403).json(responseUser);
    } else {
        res.json(responseUser);
    }
}

export {
    registerController,
    loginController
}