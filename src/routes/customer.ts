import {Router} from "express";

import {
    getCustomersControllers,
    createCustomerController,
    createCustomerByIdUserController,
    updateCustomerByIdUserController,
    updateCustomerByIdController
} from "../controllers/customer";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";

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
    createCustomerByIdUserController
)

router.use( checkRolPermit( [ RoleEnum.Admin, RoleEnum.Customer] ));

/**
 * http://localhost:3002/customer/ [PUT]
 */
router.put(
    '/',
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
    createCustomerController
)

/**
 * http://localhost:3002/customer/:id [PUT]
 */
router.put('/:id',
    updateCustomerByIdController
);

export { router }