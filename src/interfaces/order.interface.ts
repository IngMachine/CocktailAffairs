import {Booking} from "./booking.interface";
import {Status} from "./status.interfaces";
import {Customer} from "./customer.interface";

export interface Order {
    customer: Customer | string;
    booking: Booking | string;
    totalAmount?: number;
    status: Status;
}