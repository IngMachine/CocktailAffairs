import CustomerModel from "../models/customer";
import {Customer} from "../interfaces/customer.interface";
import {getUserService, updateRoleUserByIdService} from "./user";
import {RoleEnum} from "../constant/role";

const getCustomersService = async() => {
    try {
        return await CustomerModel.find({});
    } catch (err) {
        throw err;
    }
}

const createCustomerService = async ( customer: Customer ) => {
    try {
        const customerDB = await CustomerModel.findOne({ user: customer.user });
        const user = await getUserService(customer.user as string);
        if( !customerDB && user ) {
            await updateRoleUserByIdService(customer.user as string, RoleEnum.Customer);
            return await CustomerModel.create(customer);
        } else {
            return {
                ok: false,
                msg: 'The customer has been created with that user'
            }
        }
    } catch (err) {
        throw err;
    }
}

const getCustomerByIdUserService = async (idUser: string) => {
    return await CustomerModel.findOne({ user: idUser })
        .select('_id');
}

const updateCustomerService = async (customer: Customer, id: string) => {
    try {
        const user = await getUserService(customer.user as string);
        const customerDB = await CustomerModel.findById(id);

        if (user) {

            const newCustomer: Customer = {
                ...customerDB!.toObject(),
                ...customer
            };

            return await CustomerModel.findByIdAndUpdate(
                id,
                newCustomer,
                {
                    new: true,
                }
            );
        } else {
            return {
                ok: false,
                msg: 'The user not found'
            }
        }

    } catch (err) {
        throw err;
    }
}

export {
    getCustomersService,
    createCustomerService,
    getCustomerByIdUserService,
    updateCustomerService
}