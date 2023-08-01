import {Storage} from "../interfaces/storage.interface";
import StorageModel from "../models/storage";


const registerUpload = async ({ fileName, idUser, path }: Storage) => {
    return await StorageModel.create({fileName, idUser, path});
}

export {
    registerUpload
};