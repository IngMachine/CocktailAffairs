import {Request, Response} from "express";

import {
    getRolesService,
    insertRol
} from "../services/role";

import {handleHttp} from "../utils/error.handle";

const getRolesController = async ({body}: Request, res: Response) => {
    try {
        const responseRoles = await getRolesService();
        res.json(responseRoles)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_ROLES');
    }
}

const createRoleController = async ({body}: Request, res: Response) => {
    try {
        const responseRol = await insertRol(body);
        res.json(responseRol);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATE_ROL', err)
    }
}

export {
    getRolesController,
    createRoleController
}