import {Request, Response} from "express";
import {RequestExt} from "../interfaces/req-ext.interface";

import {
    getCustomersService,
    createCustomerService,
    getCustomerByIdUserService,
    updateCustomerService,
    deleteCustomerByIdService
} from "../services/customer";

import {handleHttp} from "../utils/error.handle";

import {Customer} from "../interfaces/customer.interface";
import {getIsAdminByIdUserService} from "../services/user";


const getCustomersControllers = async( req: Request, res: Response) => {
    try {
        const responseCustomers = await getCustomersService();
        return res.status(200).json(responseCustomers);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_CUSTOMERS', err);
    }
}

const getCustomerByIdUSerController = async ({params, user}: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const responseCustomer = await getCustomerByIdUserService(id);
        const customerDB = responseCustomer?.toObject();
        // @ts-ignore
        console.log()
        if( await getIsAdminByIdUserService(user?.id)) {
            if(responseCustomer){
                return res.json(responseCustomer);
            } else {
                return res.status(404).json({
                    ok: false,
                    msg: 'Customer not found'
                })
            }
        } else {
            // @ts-ignore
            if( customerDB?.user._id.toString() === user?.id ){
                return res.json(responseCustomer);
            } else {
                return res.status(401).json({
                    ok: false,
                    msg: 'User no authorized to see the customer'
                })
            }
        }
    } catch (err) {
        throw err;
    }
}

const createCustomerController = async({body, params}: Request, res: Response) => {
    try {
        console.log('entramos')
        const responseCustomer = await createCustomerService(body);
        if(responseCustomer.ok) {
            return res.status(201).json(responseCustomer);
        } else {
            return res.status(404).json(responseCustomer);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_CUSTOMER', err);
    }
}

const createCustomerByIdUserController = async({body, params, user}: RequestExt, res: Response) => {
    try {
        const { idUser} = params;
        const customer: Customer = {
            ...body,
            user: idUser
        }
        if ( idUser === user?.id ) {
            const responseBartender = await createCustomerService( customer );
            if (responseBartender.ok) {
                return res.status(201).json(responseBartender);
            } else {
                return res.status(400).json(responseBartender);
            }
        } else {
            res.status(409).json({
                ok: false,
                msg: 'You cannot create this user'
            })
        }
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_CREATED_BARTENDER', err);
    }
}

const updateCustomerByIdUserController = async ({ body, user }: RequestExt, res: Response) => {
    try {
        const responseIDCustomer = await getCustomerByIdUserService(user?.id as string);
        const idCustomer = responseIDCustomer?._id.toString();
        if( body.user ) {
            if( await getIsAdminByIdUserService(user?.id) || body.user === user?.id) {
                const responseCustomer = await updateCustomerService( idCustomer!, body  );
                if(responseCustomer.ok) {
                    return res.status(200).json(responseCustomer);
                } else {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Customer not found'
                    })
                }
            }  else {
                res.status(409).json({
                    ok: false,
                    msg: 'You cannot update this user'
                })
            }
        } else {
            body  = {
                ...body,
                user: user?.id
            }
            const responseCustomer = await updateCustomerService( idCustomer!, body  );
            if(responseCustomer.ok) {
                return res.status(200).json(responseCustomer);
            } else {
                return res.status( 404).json({
                    ok: false,
                    msg: 'Customer not found'
                })
            }
        }
    } catch (err) {
        console.log(err)
        handleHttp(res, 'ERROR_UPDATE_CUSTOMER_ERROR',err);
    }
}

const updateCustomerByIdController = async ({ body, params }:Request, res: Response) => {
    try {
        const { id } = params;
        const responseCustomer = await updateCustomerService(id, body );
        if(responseCustomer.ok) {
            return res.status(200).json(responseCustomer);
        } else {
            return res.status(404).json(responseCustomer);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_CUSTOMER_ERROR', err);
    }
}

const deleteCustomerByIdController = async ({ params }: Request, res: Response) => {
    try {
        const { id } = params;
        const responseCustomer = await deleteCustomerByIdService(id);
        if(responseCustomer) {
            return res.status(200).json(responseCustomer);
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'Customer not found'
            });
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_CUSTOMER', err);
    }
}

export {
    getCustomersControllers,
    getCustomerByIdUSerController,
    createCustomerController,
    createCustomerByIdUserController,
    updateCustomerByIdUserController,
    updateCustomerByIdController,
    deleteCustomerByIdController
}