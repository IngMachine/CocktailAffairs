import { Router} from "express";
import {check, param} from "express-validator";

import {
    getRolesController,
    createRoleController,
    updateRoleController,
    deleteRoleController
} from "../../controllers/role";

import {checkJWT, checkRolPermit} from "../../middleware/session";

import {RoleEnum} from "../../constant/role";
import {fieldsValidators} from "../../middleware/fields-validators";

const router =  Router();

router.use([checkJWT, checkRolPermit([RoleEnum.Admin])]);

/**
 * http://localhost:3002/role/ [GET]
 */
router.get(
    '/',
    getRolesController
);

/**
 * http://localhost:3002/role/ [POST]
 */
router.post(
    '/',
    [
        check('name', 'Name is required').not().notEmpty(),
        check('description', 'Description too short').isLength({min: 6}),
        fieldsValidators,
    ],
    createRoleController
)

/**
 * http://localhost:3002/role/id [PUT]
 */
router.put(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is invalid')
        ,
        check('description', 'Description too short').isLength({min: 6}),
        fieldsValidators,
    ],
    updateRoleController
)

/**
 * http://localhost:3002/role/id [DELETE]
 */
router.delete(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is invalid')
        ,
        fieldsValidators,
    ],
    deleteRoleController
)

export { router }