import {Request, Response} from "express";

import {
    getBookingsService,
} from "../services/booking";

import {handleHttp} from "../utils/error.handle";


const getBookingsController = async (req: Request, res: Response) => {
    try {
        const responseBookings = await getBookingsService();
        return res.status(200).json(responseBookings);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BOOKINGS', err)
    }
}

export {
    getBookingsController
}