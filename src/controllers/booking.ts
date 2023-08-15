import {Request, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";

import {
    getBookingsService,
    createBookingService,
    updateBookingService,
    deleteBookingService,
    getUserByBookingService
} from "../services/booking";

import {Booking} from "../interfaces/booking.interface";

import {handleHttp} from "../utils/error.handle";
import {getIsAdminByIdUserService} from "../services/user";


const getBookingsController = async (req: Request, res: Response) => {
    try {
        const responseBookings = await getBookingsService();
        return res.status(200).json(responseBookings);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_BOOKINGS', err)
    }
}

const createBookingController = async ({ body, user }: RequestExt, res: Response) => {
    try {
        let booking: Booking = {
            ...body
        }

        if ( await getIsAdminByIdUserService(user?.id) ) {
            if ( booking.user ) {
                const responseBooking = await createBookingService(booking);
                return res.status(201).json(responseBooking);
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no user id to create a booking'
                })
            }
        } else {
            booking = {
                ...booking,
                user: user?.id
            }
            const responseBooking = await createBookingService(booking);
            return res.status(200).json(responseBooking);
        }
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATE_BOOKING', err);
    }
}

const updateBookingController = async  ({ params, body, user }: RequestExt, res: Response) => {
    try {
        let booking: Booking = {
            ...body
        }
        const { id } = params;
        const userBooking = await getUserByBookingService(id);
        if( userBooking?.toObject().user.toString() === user?.id ){
            booking = {
                ...booking,
                user: user?.id
            }
            const responseBooking = await updateBookingService(id, booking);
            if( responseBooking ) {
                return res.status(200).json(responseBooking);
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: 'Booking not found'
                })
            }
        } else {
            if ( await getIsAdminByIdUserService(user?.id) && body.user ) {
                const responseBooking = await updateBookingService(id, booking);
                if( responseBooking ) {
                    return res.status(200).json(responseBooking);
                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Booking not found'
                    })
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no user id to create a booking'
                })
            }
        }
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