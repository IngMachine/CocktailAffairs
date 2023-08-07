import {Request, Response} from "express";



import {handleHttp} from "../utils/error.handle";
import {
    getStatusService,
    insertStatus,
    updateStatus,
    deleteStatusService
} from "../services/status";

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
        const responseStatus = await insertStatus(body);
        res.json(responseStatus);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_STATUS', err)
    }
}

const updateStatusController = async ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseRole = await updateStatus( id, body );
        res.status(200).json(responseRole);
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
                msg: "Status not found"
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