import {Response} from "express";

// TODO: Utilizar un sistema de log para cuando pase algo
const handleHttp = ( res: Response, error: string, errorRaw ?: any ) => {
    res.status(500).json({
        error
    })
}

export {
    handleHttp
}