import RoleModel from "../models/role";
import {Role} from "../interfaces/role.interface";


const getRolesService = async() => {
    try {
        return await RoleModel
            .find({})
            .select('-createdAt -updatedAt');
    } catch (err) {
        throw err;
    }
}

const createRoleService = async (role: Role) => {
    return await RoleModel.create({
        ...role,
        name: role.name.toUpperCase()
    });
}

const updateRoleService = async ( id: string, role: Role) => {
    try {
        const newRole = {
            ...role,
            role
        }
        return await RoleModel.findByIdAndUpdate(
            id,
            newRole,
            {
                new: true
            }
        );
    } catch (err) {
        throw err;
    }
}

const deleteRoleService = async(id: string) => {
    try {
        return await RoleModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getRolesService,
    createRoleService,
    updateRoleService,
    deleteRoleService
}