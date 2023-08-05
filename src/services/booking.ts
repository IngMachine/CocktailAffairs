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

const updateBookingService = async(id: string, booking: Booking) => {
    try {
        return await BookingModel.findByIdAndUpdate(
            id,
            booking,
            {
                new: true
            }
        );
    } catch (err) {
        throw err;
    }
}

const deleteBookingService = async(id: string) => {
    try {
        return await BookingModel.findByIdAndDelete(
            id
        );
    } catch (err) {
        throw err;
    }
}

export {
    getBookingsService,
    createBookingService,
    updateBookingService,
    deleteBookingService
}