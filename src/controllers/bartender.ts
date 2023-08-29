import {Request, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";
import * as Joi from "joi";

import {
    getBartendersService,
    getBartenderByIdUserService,
    createBartenderService,
    updateBartenderService,
    deleteBartenderByIdService
} from "../services/bartender";

import {handleHttp} from "../utils/error.handle";
import {Bartender} from "../interfaces/bartender.interface";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

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

        const schema = Joi.object({
            user: Joi.string().required(),
            age: Joi.number().required(),
            specialties: Joi.array().min(1).required(),
            professionalDescription: Joi.string().required(),
            isAvailable: Joi.boolean().optional()
        });
        const data = await schema.validate(body);
        if (data.error) {
            return res.status(400).json({
                ok: false,
                errors: data.error
            });
        }

        const responseBartender = await createBartenderService(body, files);
        return res.status(201).json(responseBartender);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const createBartenderByIdUserController = async ({ params, body, files, user }: RequestExt, res: Response) => {
    try {
        const { idUserBartender} = params;
        const bartender: Bartender = {
            ...body,
            user: idUserBartender
        }

        const schema = Joi.object({
            age: Joi.number().required(),
            specialties: Joi.array().min(1).required(),
            professionalDescription: Joi.string().required(),
            isAvailable: Joi.boolean().optional()
        });
        const data = await schema.validate(body);
        if (data.error) {
            return res.status(400).json({
                ok: false,
                errors: data.error
            });
        }

        if ( idUserBartender === user?.id ) {
            const responseBartender = await createBartenderService( bartender, files );
            return res.status(201).json(responseBartender);
        } else {
            res.status(401).json({
                ok: false,
                msg: MessageErrorsEnum.NoAuthorizedForCreateBartender
            })
        }
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const updateBartenderByIdUserController = async ({ body, files, user }: RequestExt, res: Response)  => {
    try {

        const schema = Joi.object({
            user: Joi.string().required(),
            age: Joi.number().optional(),
            specialties: Joi.array().min(1).optional(),
            professionalDescription: Joi.string().optional(),
            isAvailable: Joi.boolean().optional()
        });
        const data = await schema.validate(body);
        if (data.error) {
            return res.status(400).json({
                ok: false,
                errors: data.error
            });
        }

        const responseIDBartender = await getBartenderByIdUserService(user!.id as string);
        const idBartender = responseIDBartender?._id.toString();
        if ( body.user === user?.id ) {
            const responseBartender = await updateBartenderService( body, files, idBartender! );
            if( responseBartender.ok ) {
                return res.status(200).json(responseBartender);
            } else {
                return res.status(404).json(responseBartender);
            }
        } else {
            res.status(409).json({
                ok: false,
                msg: MessageErrorsEnum.NoAuthorizedForUpdateBartender
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
        if( responseBartender.ok ) {
            return res.status(200).json(responseBartender);
        } else {
            return res.status(404).json(responseBartender);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const deleteBartenderByIdController = async ( {params}:Request, res: Response ) => {
    try {
        const { id } = params;
        const responseBartender = await deleteBartenderByIdService(id);
        if (responseBartender) {
            return res.status(200).json(responseBartender);
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'Bartender not found'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_BARTENDER_BY_ID', err);
    }
}

export {
    getBartendersController,
    createBartenderController,
    createBartenderByIdUserController,
    updateBartenderByIdUserController,
    updateBartenderByIdController,
    deleteBartenderByIdController
}