import { Schema, model } from 'mongoose'
import {Booking} from "../interfaces/booking.interface";

import User from "./user";
import Bartender from "./bartender";


const BookingSchema = new Schema<Booking>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true
        },
        bartenders:[
            {
                type: Schema.Types.ObjectId,
                ref: Bartender,
                required: true
            }
        ],
        eventDate: {
            type: Date,
            required: true,
        },
        eventTime: {
            type: Date,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        location: {
            type: String,
        },
        guestCount: {
            type: Number,
            required: true
        },
        specialRequests: {
            type: String
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
)

BookingSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const BookingModel = model('booking', BookingSchema);

export default BookingModel;