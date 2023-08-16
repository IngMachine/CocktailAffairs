import { Router} from "express";
import {check, param} from "express-validator";

import {
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController
} from "../../controllers/user";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {fieldsValidators} from "../../middleware/fields-validators";
import {RoleEnum} from "../../constant/role";

const router =  Router();

router.use(
    [
        checkJWT,
        checkRolPermit([RoleEnum.Admin, RoleEnum.Visitor])
    ]
);

/**
 * http://localhost:3002/user/:id [GET]
 */
router.get(
    '/:id',
    getUserController
)

/**
 * http://localhost:3002/user/:id [PUT]
 */
router.put(
    '/:id',
    [
        param(':id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is invalid'),
        check('name', 'Name is required').not().notEmpty()
            .isLength({min: 3}).withMessage('Name is too short'),
        check('description', 'Description is too short').isLength({ min: 6}),
        fieldsValidators
    ],
    updateUserController
);

router.use( checkRolPermit([RoleEnum.Admin]))
/**
 * http://localhost:3002/user/ [GET]
 */
router.get(
    '/',
    getUsersController
);

/**
 * http://localhost:3002/auth/login [DELETE]
 */
router.delete(
    '/:id',
    [
        param(':id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is invalid'),
        fieldsValidators
    ],
    deleteUserController
)

export { router }