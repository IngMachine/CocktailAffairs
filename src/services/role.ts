import RoleModel from "../models/role";
import {Role} from "../interfaces/role.interface";


const getRolesService = async() => {
    return await RoleModel
        .find({})
        .select('-createdAt -updatedAt')
}

const insertRol = async (role: Role) => {
    return await RoleModel.create({
        ...role,
        name: role.name.toUpperCase()
    });
}

const updateRol = async ( id: string, role: Role) => {
    try {
        return await RoleModel.findByIdAndUpdate(
            id,
            {
                ...role,
                name: role.name.toUpperCase()
            },
            {
                new: true
            }
        );
    } catch (err) {
        throw err;
    }
}

const deleteRoleService = async(id: string) => {
    return await RoleModel.findByIdAndDelete(id);
}

export {
    getRolesService,
    insertRol,
    updateRol,
    deleteRoleService
}