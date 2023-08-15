import {Router} from "express";

import {
    getCustomersControllers,
    getCustomerByIdUSerController,
    createCustomerController,
    createCustomerByIdUserController,
    updateCustomerByIdUserController,
    updateCustomerByIdController,
    deleteCustomerByIdController
} from "../controllers/customer";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";
import {check, param} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

const router =  Router();

router.use( [
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin, RoleEnum.Visitor ] )
]);

/**
 * http://localhost:3002/customer/:idUser [POST]
 */
router.post(
    '/:idUser',
    [
        param('idUser', 'The user no is id valid').isMongoId(),
        check('phoneNumber', 'The phone number is required')
            .not()
            .notEmpty(),
        check('shippingAddress', 'The shipping address is required')
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createCustomerByIdUserController
)

router.use( checkRolPermit( [ RoleEnum.Admin, RoleEnum.Customer] ));

/**
 * http://localhost:3002/customer/:id [GET]
 */
router.get(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id no is valid'),
        fieldsValidators
    ],
    getCustomerByIdUSerController
)


/**
 * http://localhost:3002/customer/ [PUT]
 */
router.put(
    '/',
    [
        check('phoneNumber', 'The phone number is required')
            .not()
            .notEmpty(),
        check('shippingAddress', 'The shipping address is required')
            .not()
            .notEmpty(),
        check('user')
            .optional()
            .isMongoId().withMessage('The user no is id valid'),
        fieldsValidators
    ],
    updateCustomerByIdUserController
)

router.use( checkRolPermit( [RoleEnum.Admin] ));

/**
 * http://localhost:3002/customer/ [GET]
 */
router.get(
    '/',
    getCustomersControllers
);


/**
 * http://localhost:3002/customer/ [POST]
 */
router.post(
    '/',
    [
        check('user', 'The user is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The user no is id valid'),
        check('phoneNumber', 'The phone number is required')
            .not()
            .notEmpty(),
        check('shippingAddress', 'The shipping address is required')
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createCustomerController
)

/**
 * http://localhost:3002/customer/:id [PUT]
 */
router.put('/:id',
    [
        param('id', 'The user no is id valid').isMongoId(),
        check('user', 'The user is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The user no is id valid'),
        check('phoneNumber', 'The phone number is required')
            .not()
            .notEmpty(),
        check('shippingAddress', 'The shipping address is required')
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    updateCustomerByIdController
);

router.delete(
    '/:id',
    [
        param('id', 'The user no is id valid').isMongoId(),
        fieldsValidators
    ],
    deleteCustomerByIdController
)

export { router }