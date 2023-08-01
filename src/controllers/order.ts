import {Response} from "express";
import {handleHttp} from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";



const getItems = (req: RequestExt, res: Response)  => {
    try {
        res.json(
            {
                data: "Esto solo lo ven las personas con session / jwt",
                user: req.user
            }
        )
    } catch (err) {
        handleHttp(res, "ERROR_GET_ORDERS")
    }
}

export {
    getItems
}