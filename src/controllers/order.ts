import {Request, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";

import {
    getOrdersService,
    getOrderByIdUserService,
    getOrderByIdService,
    createOrderService,
    updateOrderService,
    deleteOrderByIdService
} from "../services/order";

import {getIsAdminByIdUserService} from "../services/user";

import {handleHttp} from "../utils/error.handle";
import {getCustomerByIdService} from "../services/customer";


const getOrdersController = async (req: Request, res: Response) => {
    try {
        const responseOrders = await getOrdersService();
        res.status(200).json(responseOrders);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_ORDERS', err);
    }
}

const getOrdersByUserController = async ({ params, body, user }: RequestExt, res: Response) => {
    try {
        const { idUser } = params;
        if ( idUser === user?.id as string ) {
            console.log('user')
            const orderResponse = await getOrderByIdUserService(idUser);
            return res.status(200).json(orderResponse);
        } else {
            if(await getIsAdminByIdUserService( user?.id as string )) {
                console.log('admin');
                const orderResponse = await getOrderByIdUserService(idUser);
                res.status(200).json(orderResponse);
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'User not authorized'
                })
            }
        }
    } catch (err) {
        handleHttp(res, 'ERROR_GET_ORDERS_BY_ID_USER', err);
    }
}

const getOrderByIdController = async ({ params, body, user }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const orderResponse = await getOrderByIdService(id);
        if( await getIsAdminByIdUserService(user?.id) ) {
            if(orderResponse) {
                return res.status(200).json(orderResponse);
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: 'Order not found'
                })
            }
        } else {
            const customerResponse = await getCustomerByIdService(orderResponse?.customer as string);
            if(customerResponse?.user.toString() === user?.id) {
                if(orderResponse) {
                    return res.status(200).json(orderResponse);
                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Order not found'
                    })
                }
            } else {
                return res.status(401).json({
                    ok:false,
                    msg: 'No authorized for see order'
                })
            }
        }
    } catch (err) {
        handleHttp(res, 'ERROR_GET_ORDER_BY_ID', err);
    }
}

const createOrderController = async ({ body, params, user }: RequestExt, res: Response) => {
    try {
        if ( body.user ){
            if( await getIsAdminByIdUserService(user?.id)){
                const responseOrder = await createOrderService( body, body.user);
                if(responseOrder.ok) {
                    return res.status(201).json(responseOrder)
                } else {
                    return res.status(404).json(responseOrder)
                }
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'No authorized for creating order'
                })
            }
        } else {
            const responseOrder = await createOrderService( body, user?.id);
            if ( responseOrder.ok) {
                res.status(201).json(responseOrder);
            } else {
                res.status(400).json(responseOrder)
            }
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_ORDER', err);
    }
}

const updateOrderByIdController = async ({params, body}: Request, res: Response) => {
    try {
        const {id} = params;
        const orderResponse = await updateOrderService(id, body);
        if (orderResponse.ok) {
            return res.status(200).json(orderResponse);
        } else {
            return res.status(400).json(orderResponse);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_ORDER', err);
    }
}

const deleteOrderByIdController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseOrder = await deleteOrderByIdService(id);
        if ( responseOrder ) {
            return  res.status(200).json(responseOrder);
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'Order not found'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_ORDER', err);
    }
}

export {
    getOrdersController,
    getOrdersByUserController,
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    deleteOrderByIdController
}