import {NextFunction, Request, Response} from "express";

const {validationResult} = require("express-validator");
export const fieldsValidators = (req: Request, res: Response, next: NextFunction) => {

    // Manage the errors
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}
