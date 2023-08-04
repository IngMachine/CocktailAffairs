import {Request, Response} from "express";

import {
    getBartendersService,
    createBartenderService
} from "../services/bartender";

import {handleHttp} from "../utils/error.handle";

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
        const responseBartender = await createBartenderService(files, body);
        return res.status(201).json(responseBartender);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

export {
    getBartendersController,
    createBartenderController
}