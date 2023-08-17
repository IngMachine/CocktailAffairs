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
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

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
    [
        param(':id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    getUserController
)

/**
 * http://localhost:3002/user/:id [PUT]
 */
router.put(
    '/:id',
    [
        param(':id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty()
            .isLength({min: 3}).withMessage(MessageErrorsEnum.NameIsTooShort),
        check('description', MessageErrorsEnum.DescriptionIsTooShort).isLength({ min: 6}),
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
        param(':id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    deleteUserController
)

export { router }