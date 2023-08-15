import { Router} from "express";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";

import {
    getOrdersController,
    getOrdersByUserController,
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    deleteOrderByIdController
} from "../controllers/order";

import {check, param} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

const router =  Router();

router.use([
    checkJWT,
    checkRolPermit([RoleEnum.Admin, RoleEnum.Customer])
])

router.get(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    getOrderByIdController
);

router.get(
    '/byIdUser/:idUser',
    [
        param('idUser', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id user not is valid'),
        fieldsValidators
    ],
    getOrdersByUserController
)

router.post(
    '/',
    [
        check('user')
            .optional()
            .isMongoId().withMessage('The id not is valid'),
        check('booking', 'The booking is required')
            .not().notEmpty()
            .isMongoId().withMessage('The booking not is valid'),
        check('status')
            .optional()
            .isMongoId().withMessage('The status not is valid'),
        check('totalAmount')
            .optional()
            .isNumeric().withMessage('The totalAmount not is valid'),
        fieldsValidators
    ],
    createOrderController
);



router.use( checkRolPermit([RoleEnum.Admin]));

/**
 * http://localhost:3002/order/ [GET]
 */
router.get(
    '/',
    getOrdersController
);

router.put(
    '/:id',
    [
        check('booking')
            .optional()
            .isMongoId().withMessage('The booking id not valid'),
        check('totalAmount')
            .optional()
            .isNumeric().withMessage('The total amount is not valid'),
        fieldsValidators
    ],
    updateOrderByIdController
)

router.delete(
    '/:id',
    [
        param('id', 'The order id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The order id not valid'),
        fieldsValidators
    ],
    deleteOrderByIdController
)

export { router }