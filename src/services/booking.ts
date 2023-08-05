import BookingModel from "../models/booking";

import {Booking} from "../interfaces/booking.interface";


const getBookingsService = async() => {
    try {
        return await BookingModel.find({});
    } catch (err) {
        throw err;
    }
}

const createBookingService = async(booking: Booking) => {
    try {
        return await BookingModel.create(booking);
    } catch (err) {
        throw err;
    }
}

export {
    getBookingsService,
    createBookingService
}