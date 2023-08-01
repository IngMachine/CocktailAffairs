import { Response } from "express";
import { registerUpload } from "../services/storage";
import { handleHttp } from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";
import {Storage} from "../interfaces/storage.interface";

const getFile = async (req: RequestExt, res: Response) => {
    try {
        const { user, file } = req;
        const dataToRegister: Storage = {
            fileName: `${file?.filename}`,
            idUser: `${user?.id}`,
            path: `${file?.path}`,
        };
        const response = await registerUpload(dataToRegister);
        res.send(response);
    } catch (e) {
        handleHttp(res, "ERROR_GET_BLOG");
    }
};

export { getFile };