import StatusModel from "../models/status";
import {Status} from "../interfaces/status.interfaces";

const getStatusService = async() => {
    try {
        return await StatusModel
            .find({})
            .select('-createdAt -updatedAt');
    } catch (err) {
        throw err;
    }
}

const createStatusService = async (status: Status) => {
    return await StatusModel.create({
        ...status,
        name: status.name.toUpperCase()
    });
}

const updateStatusService = async ( id: string, status: Status) => {
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
    try {
        return await StatusModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getStatusService,
    createStatusService,
    updateStatusService,
    deleteStatusService
}