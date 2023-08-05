import {User} from "./user.interface";
import {Bartender} from "./bartender.interface";

export interface Booking {
    user: User;
    bartender?: Bartender[];
    eventDate: Date;
    eventTime: Date;
    duration: number;
    location?: string;
    guestCount: number;
    specialRequests?: string;
}