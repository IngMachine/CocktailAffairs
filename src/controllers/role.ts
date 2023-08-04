import {Request, Response} from "express";

import {
    getRolesService,
    insertRol,
    updateRol
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
        handleHttp(res, 'ERROR_CREATE_ROL', err)
    }
}

const updateRoleController = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseRole = await updateRol( id, body );
        res.status(200).json(responseRole);
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_ROL', err);
    }
}

export {
    getRolesController,
    createRoleController,
    updateRoleController
}