import StatusModel from "../models/status";
import {Status} from "../interfaces/status.interfaces";


const getStatusService = async() => {
    return await StatusModel
        .find({})
        .select('-createdAt -updatedAt')
}

const insertStatus = async (status: Status) => {
    return await StatusModel.create({
        ...status,
        name: status.name.toUpperCase()
    });
}

const updateStatus = async ( id: string, status: Status) => {
    try {
        return await StatusModel.findByIdAndUpdate(
            id,
            {
                ...status,
                name: status.name.toUpperCase()
            },
            {
                new: true
            }
        );
    } catch (err) {
        throw err;
    }
}

const deleteStatusService = async(id: string) => {
    return await StatusModel.findByIdAndDelete(id);
}

export {
    getStatusService,
    insertStatus,
    updateStatus,
    deleteStatusService
}