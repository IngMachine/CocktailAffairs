import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";
import {getRolesService} from "./role";

const getUsersService = async () => {
    return await UserModel.find({})
        .select('name email description role -_id')
        .populate('role', '-_id name description')
}

const getUserService = async (id: string) => {
    return await UserModel.findById(id)
        .populate('role', '_id name');
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

const updateRoleUserByIdService = async (id: string, role: string) => {
    try {
        const rolesService = await getRolesService();
        const roles = rolesService.map( role => {
            return {
                ...role.toObject(),
                _id: role._id.toString()
            }
        })

        const roleAdd = roles.find(rol => rol.name === role );

        const userService = await getUserService(id);
        const user = userService!.toObject();
        const rolesUser = user.role.map( rol => {
            return {
                ...rol,
                // @ts-ignore
                _id: rol._id.toString()
            }
        });

        const isRoleIdIncluded = rolesUser.some(rol => rol._id === roleAdd!._id);

        if ( !isRoleIdIncluded ) {

            rolesUser!.push(roleAdd!);

            const newRoles = rolesUser.map(role => role._id);

            const newUser = {
                ...user,
                role: newRoles
            }

            await updateUserService(id, newUser);
        }
    } catch (err) {
        throw err;
    }
}

const deleteUserService = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
}

export  {
    getUsersService,
    getUserService,
    updateUserService,
    updateRoleUserByIdService,
    deleteUserService
}