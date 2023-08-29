import CustomerModel from "../models/customer";
import {Customer} from "../interfaces/customer.interface";
import {getUserService, updateRoleUserByIdService} from "./user";
import {RoleEnum} from "../constant/role";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

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
            return {
                ok: true,
                msg: await CustomerModel.create(customer)
            }
        } else {
            return {
                ok: false,
                msg: MessageErrorsEnum.CustomerCreatedWithThisUser
            }
        }
    } catch (err) {
        throw err;
    }
}

const getCustomerByIdUserService = async (idUser: string) => {
    try {
        return await CustomerModel.findOne({ user: idUser })
            .select('_id phoneNumber shippingAddress')
            .populate('user', 'name email description _id');
    } catch (err) {
        throw err;
    }
}

const getCustomerByIdService = async (id: string) => {
    try {
        return await CustomerModel.findById(id);
    } catch (err) {
        throw err;
    }
}

const updateCustomerService = async (id: string, customer: Customer ) => {
    try {
        const user = await getUserService(customer.user as string);
        const customerDB = await CustomerModel.findById(id);

        if (customerDB?.user!.toString() === user?._id.toString() && customerDB) {

            const newCustomer: Customer = {
                ...customerDB.toObject(),
                ...customer
            };

            return {
                ok: true,
                msg: await CustomerModel.findByIdAndUpdate(
                    id,
                    newCustomer,
                    {
                        new: true,
                    }
                )
            }
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

const deleteCustomerByIdService = async (id: string) => {
    try {
        return CustomerModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getCustomersService,
    createCustomerService,
    getCustomerByIdUserService,
    getCustomerByIdService,
    updateCustomerService,
    deleteCustomerByIdService
}