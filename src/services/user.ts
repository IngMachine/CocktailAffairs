import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";

const getUsersService = async () => {
    return await UserModel.find({})
        .select('name email description role -_id')
        .populate('role', '-_id name description')
}

const updateUserService = async (id: string, user: User) => {
    try {
        const userDB = await UserModel.findById(id);
        const userData = userDB!.toObject();
        const newUser = {
            ...userData,
            ...user
        }

        return  await UserModel.findByIdAndUpdate(
            id,
            newUser,
            {
                new: true
            }
        ).populate('role', 'name description -_id');

    } catch (err) {
        throw err;
    }
}

const deleteUserService = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
}

export  {
    getUsersService,
    updateUserService,
    deleteUserService
}