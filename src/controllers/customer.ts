import {Request, Response} from "express";

import {
    getCustomersService,
    createCustomerService,
    getCustomerByIdUserService, updateCustomerService
} from "../services/customer";

import {handleHttp} from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";
import {Customer} from "../interfaces/customer.interface";


const getCustomersControllers = async( req: Request, res: Response) => {
    try {
        const responseCustomers = await getCustomersService();
        return res.status(200).json(responseCustomers);
    } catch (err) {
        handleHttp(res, 'ERROR_GET_CUSTOMERS', err);
    }
}

const createCustomerController = async({body, params}: Request, res: Response) => {
    try {
        const responseCustomer = await createCustomerService(body);
        return res.status(201).json(responseCustomer);
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
            return res.status(201).json(responseBartender);
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
        const responseIDCustomer = await getCustomerByIdUserService(user!.id as string);
        const idCustomer = responseIDCustomer?._id.toString();

        if ( body.user === user?.id ) {
            const responseCustomer = await updateCustomerService( body, idCustomer! );
            return res.status(200).json(responseCustomer);
        } else {
            res.status(409).json({
                ok: false,
                msg: 'You cannot update this user'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_CUSTOMER_ERROR',err);
    }
}

const updateCustomerByIdController = async ({ body, params }:Request, res: Response) => {
    try {
        const { id } = params;
        const responseCustomer = await updateCustomerService(body, id);
        return res.status(200).json(responseCustomer);
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_CUSTOMER_ERROR', err);
    }
}

export {
    getCustomersControllers,
    createCustomerController,
    createCustomerByIdUserController,
    updateCustomerByIdUserController,
    updateCustomerByIdController
}