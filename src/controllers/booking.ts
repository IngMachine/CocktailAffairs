import {Request, Response} from "express";


const getBookingController = async (req: Request, res: Response) => {
    res.send('testing');
}

export {
    getBookingController
}