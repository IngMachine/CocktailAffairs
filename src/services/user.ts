import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";

import {getRolesService} from "./role";
import {RoleEnum} from "../constant/role";

const getUsersService = async () => {
    try {
        return await UserModel.find({})
            .select('name email description role _id')
            .populate('role', '-_id name description');
    } catch (err) {
        throw err;
    }
}

const getUserService = async (id: string) => {
    try {
        return await UserModel.findById(id)
            .select('-password')
            .populate('role', '_id name');
    } catch (err) {
        throw err;
    }
}

const getIsAdminByIdUserService = async (id: string) => {
    const roles =  await UserModel.findById( id ).select('-_id role').populate('role', '-_id name');
    const roleNames = roles?.role.map(role => role.name) || [];
    return !!roleNames.includes(RoleEnum.Admin);
}

const updateUserService = async (id: string, user: User) => {
    try {
        const userDB = await UserModel.findById(id);
        const userData = userDB!.toObject();
        const rolesDB = userData.role.map( role => role.toString() );
        // @ts-ignore
        const newRoles = user.role as string[] || [];

        let filteredRoles = newRoles.filter(role => !rolesDB.includes(role));
        let resultArray = rolesDB.concat(filteredRoles);

        const newUser = {
            ...userData,
            ...user,
            role: resultArray
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
    try {
        return await UserModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}



export  {
    getUsersService,
    getUserService,
    getIsAdminByIdUserService,
    updateUserService,
    updateRoleUserByIdService,
    deleteUserService
}