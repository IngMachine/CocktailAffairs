import { Router} from "express";

import {check} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

import {
    getBookingsController,
    createBookingController,
    updateBookingController
} from "../controllers/booking";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";

const router =  Router();

router.use([
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin ] )
])

/**
 * http://localhost:3002/booking/ [GET]
 */
router.get(
    '/',
    getBookingsController
);

/**
 * http://localhost:3002/booking/ [POST]
 */
router.post(
    '/',
    createBookingController
);

/**
 * http://localhost:3002/booking/:id [PUT]
 */
router.put(
    '/:id',
    updateBookingController
);



export { router }