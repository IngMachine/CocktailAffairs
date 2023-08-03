import {Response} from "express";

const handleHttp = ( res: Response, error: string, errorRaw ?: any ) => {
    res.status(500).json({
        error
    })
}

export {
    handleHttp
}