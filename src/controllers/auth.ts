import {Request, Response} from "express";
import {createUser, loginUser} from "../services/auth";


const registerController = async ({body}: Request, res: Response) => {
    const responseUser = await createUser(body);
    res.json(responseUser);
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