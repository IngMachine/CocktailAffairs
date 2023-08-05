import { Router} from "express";

import {check} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

const router =  Router();

/**
 * http://localhost:3002/auth/register [POST]
 */
router.post(
    '/register',
    [
    ],
);

/**
 * http://localhost:3002/auth/login [POST]
 */
router.post('/', )

export { router }