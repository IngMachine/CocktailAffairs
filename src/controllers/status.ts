import {Request, Response} from "express";



import {handleHttp} from "../utils/error.handle";
import {
    getStatusService,
    createStatusService,
    updateStatusService,
    deleteStatusService
} from "../services/status";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

const getStatusController = async ({body}: Request, res: Response) => {
    try {
        const responseStatus = await getStatusService();
        res.json(responseStatus)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_STATUS', err);
    }
}

const createStatusController = async ({body}: Request, res: Response) => {
    try {
        const responseStatus = await createStatusService(body);
        return res.status(201).json(responseStatus);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_STATUS', err)
    }
}

const updateStatusController = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseRole = await updateStatusService( id, body );
        if ( responseRole ) {
            return res.status(200).json(responseRole);
        } else {
            // TODO probar que funcione el 404 con un id que no existe
            return res.status(404).json({
                ok: false,
                msg: MessageErrorsEnum.StatusNotFound
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_ROL', err);
    }
}

const deleteStatusController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseRole = await deleteStatusService(id);
        if (responseRole) {
            return res.status(200).json(responseRole);
        } else {
            return res.status(404).json({
                ok: false,
                msg: MessageErrorsEnum.StatusNotFound
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_ROL', err)
    }
}

export {
    getStatusController,
    createStatusController,
    updateStatusController,
    deleteStatusController
}