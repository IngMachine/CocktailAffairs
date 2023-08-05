import {Request, Response} from "express";

import {
    getBookingsService,
    createBookingService,
    updateBookingService,
    deleteBookingService
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

const createBookingController = async ({body}: Request, res: Response) => {
    try {
        const responseBooking = await createBookingService(body);
        res.status(200).json(responseBooking);
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATE_BOOKING', err);
    }
}

const updateBookingController = async  ({ params, body }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseBooking = await updateBookingService(id, body);
        res.status(200).json(responseBooking);
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_BOOKING', err);
    }
}

const deleteBookingController = async ({ params, body }: Request, res:Response) => {
    try {
        const { id } = params;
        const responseBooking = await deleteBookingService(id);
        if (responseBooking) {
            return res.status(200).json(responseBooking);
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Booking not found"
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_BOOKING', err);
    }
}

export {
    getBookingsController,
    createBookingController,
    updateBookingController,
    deleteBookingController
}