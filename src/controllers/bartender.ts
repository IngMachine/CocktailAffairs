import {Request, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";

import {
    getBartendersService,
    getBartenderByIdUserService,
    createBartenderService,
    updateBartenderService
} from "../services/bartender";

import {handleHttp} from "../utils/error.handle";
import {Bartender} from "../interfaces/bartender.interface";

const getBartendersController = async (req: Request, res: Response) => {
    try {
        const responseBartenders = await getBartendersService();
        res.status(200).json(responseBartenders);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BARTENDERS', err)
    }
}

const createBartenderController = async ({ body, files  }: Request, res: Response) => {
    try {
        const responseBartender = await createBartenderService(body, files);
        return res.status(201).json(responseBartender);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const createBartenderByIdUserController = async ({ params, body, files, user }: RequestExt, res: Response) => {
    try {
        const { idUser} = params;
        const bartender: Bartender = {
            ...body,
            user: idUser
        }
        if ( idUser === user?.id ) {
            const responseBartender = await createBartenderService( bartender, files );
            return res.status(201).json(responseBartender);
        } else {
            res.status(409).json({
                ok: false,
                msg: 'You cannot create this user'
            })
        }
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const updateBartenderByIdUserController = async ({ body, files, user }: RequestExt, res: Response)  => {
    try {
        const responseIDBartender = await getBartenderByIdUserService(user!.id as string);
        const idBartender = responseIDBartender?._id.toString();
        if ( body.user === user?.id ) {
            const responseBartender = await updateBartenderService( body, files, idBartender! );
            return res.status(200).json(responseBartender);
        } else {
            res.status(409).json({
                ok: false,
                msg: 'You cannot update this user'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_ERROR',err);
    }
}

const updateBartenderByIdController = async( {body, files, params }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseBartender = await updateBartenderService(body, files, id);
        return res.status(201).json(responseBartender);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

export {
    getBartendersController,
    createBartenderController,
    createBartenderByIdUserController,
    updateBartenderByIdUserController,
    updateBartenderByIdController
}