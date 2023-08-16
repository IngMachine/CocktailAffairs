import { Router} from "express";

import {
    getStatusController,
    updateStatusController,
    createStatusController,
    deleteStatusController
} from "../../controllers/status";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";
import {check, param} from "express-validator";
import {fieldsValidators} from "../../middleware/fields-validators";

const router =  Router();

router.use(checkJWT);

/**
 * http://localhost:3002/status/ [GET]
 */
router.get(
    '/',
    getStatusController
);

router.use([checkJWT, checkRolPermit([RoleEnum.Admin])]);

/**
 * http://localhost:3002/status/ [POST]
 */
router.post(
    '/',
    [
        check('name', 'The name is required')
            .not()
            .notEmpty(),
        check('description', 'The description is required')
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createStatusController
)

/**
 * http://localhost:3002/status/id [PUT]
 */
router.put(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is not valid'),
        check('name', 'The name is required')
            .not()
            .notEmpty(),
        check('description', 'The description is required')
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    updateStatusController
)

/**
 * http://localhost:3002/status/id [DELETE]
 */
router.delete(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id is not valid'),
        fieldsValidators
    ],
    deleteStatusController
)

export { router }