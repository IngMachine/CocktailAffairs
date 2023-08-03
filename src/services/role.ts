import RoleModel from "../models/role";
import {Role} from "../interfaces/role.interface";


const getRolesService = async() => {
    return await RoleModel
        .find({})
        .select('-_id -createdAt -updatedAt')
}

const insertRol = async (role: Role) => {
    return await RoleModel.create({
        ...role,
        name: role.name.toUpperCase()
    });
}

export {
    getRolesService,
    insertRol
}