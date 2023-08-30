import OrderModel from "../models/order";
import {Order} from "../interfaces/order.interface";

import {getCustomerByIdUserService} from "./customer";
import {getBookingByIdService, getUserByBookingService} from "./booking";
import {MessageErrorsEnum} from "../constant/messageOfErrors";


const getOrdersService = async () => {
    try {
        return await OrderModel.find({});
    } catch (err) {
        throw err;
    }
}

const getOrderByIdUserService = async( id: string) => {
    try {
        const customer = await getCustomerByIdUserService(id);
        if( customer ) {
            return {
                ok: true,
                msg: await OrderModel.find({ customer: customer._id.toString() })
            };
        } else {
            return {
                ok: false,
                msg: MessageErrorsEnum.CustomerNotFound
            }
        }
    } catch (err) {
        throw err;
    }
}
const getOrderByIdService = async( id: string) => {
    try {
        return await OrderModel.findById( id );
    } catch (err) {
        throw err;
    }
}

const getOrderByBooking = async( id: string ) => {
    try {
        return await OrderModel.findOne({ booking: id });
    } catch (err) {
        throw err;
    }
}

const createOrderService = async (order: Order, idUser: string ) => {
    try {
        const booking = await getBookingByIdService(order.booking as string);
        if ( booking?.user.toString() === idUser ) {
            const customer = await getCustomerByIdUserService(idUser);
            const orderBookingDB = await getOrderByBooking(booking._id.toString());
            if (!orderBookingDB) {
                if (customer) {
                    const newOrder: Order = {
                        ...order,
                        customer: customer._id.toString(),
                        totalAmount: 2500
                    }
                    return {
                        ok: true,
                        msg: await OrderModel.create(newOrder)
                    }
                } else {
                    return {
                        ok: false,
                        msg: MessageErrorsEnum.CustomerNotFound
                    }
                }
            } else {
                return {
                    ok: false,
                    msg: MessageErrorsEnum.BookingAlreadyInOrders
                }
            }
        } else {
            return {
                ok: false,
                msg: MessageErrorsEnum.TheBookingDoesNotBelongToThisUserId
            }
        }
    } catch (err) {
        throw err;
    }
}

const updateOrderService = async( id: string, order: Order) => {
    try {
        const orderDB = await getOrderByIdService(id);

        if ( orderDB ) {
            if ( order.booking ) {
                const bookingDB = orderDB.toObject().booking.toString()

                const userDB = await getUserByBookingService(bookingDB);
                const newUser = await getUserByBookingService(order.booking as string);

                const newOrder: Order = {
                    ...orderDB.toObject(),
                    ...order
                }

                if (userDB?.user.toString() === newUser?.user.toString()) {
                    return {
                        ok:true,
                        msg: await OrderModel.findByIdAndUpdate(
                            id,
                            newOrder,
                            {
                                new: true
                            }
                        )
                    }
                } else {
                    return {
                        ok: false,
                        msg: MessageErrorsEnum.TheUserNotIsTheSame
                    }
                }
            } else {
                const newOrder: Order = {
                    ...orderDB.toObject(),
                    ...order
                }
                return {
                    ok:true,
                    msg: await OrderModel.findByIdAndUpdate(
                        id,
                        newOrder,
                        {
                            new: true
                        }
                    )
                }
            }

        } else {
            return {
                ok: false,
                msg: MessageErrorsEnum.OrderNotFound
            }
        }
    } catch (err) {
        throw  err;
    }
}

const deleteOrderByIdService = async (id: string) => {
    try {
        return await OrderModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getOrdersService,
    getOrderByIdUserService,
    getOrderByIdService,
    createOrderService,
    updateOrderService,
    deleteOrderByIdService
}