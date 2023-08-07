import {User} from "./user.interface";

export interface Customer {
    user: User | string;
    phoneNumber: string;
    shippingAddress: string;
}