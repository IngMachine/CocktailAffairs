import Booking from "../models/booking";


const getBookingsService = async() => {
    try {
        return await Booking.find({});
    } catch (err) {
        throw err;
    }
}

export {
    getBookingsService
}