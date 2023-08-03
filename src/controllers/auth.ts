import {Request, Response} from "express";
import {createUser, loginUser} from "../services/auth";
import {handleHttp} from "../utils/error.handle";


const registerController = async ({body}: Request, res: Response) => {
    try {
        const responseUser = await createUser(body);
        res.json(responseUser);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_USER', err)
    }
}

const loginController = async ({body}: Request, res: Response) => {
    const responseUser = await loginUser(body);
    if ( responseUser === "PASSWORD_INCORRECT" || responseUser === "NOT_FOUND_USER") {
        res.status(403).json(responseUser);
    } else {
        res.json(responseUser);
    }
}

export {
    registerController,
    loginController
}