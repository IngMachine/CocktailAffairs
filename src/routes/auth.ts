import { Router} from "express";
import {loginController, registerController} from "../controllers/auth";
import {check} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

const router =  Router();

/**
 * http://localhost:3002/auth/register [POST]
 */
router.post(
    '/register',
    [
        check('name', 'The name is required').not().notEmpty(),
        check('password', 'The password is required').not().notEmpty()
            .isLength({min: 6}).withMessage('The password is minimum the 6 characters'),
        check('email', 'The email is required').not().notEmpty()
            .isEmail().withMessage('The email not valid format'),
        fieldsValidators
    ],
    registerController
);

/**
 * http://localhost:3002/auth/login [POST]
 */
router.post('/login', loginController)

export { router }