import {Router} from "express";
import {param} from "express-validator";

import {
    createBookingController,
    deleteBookingController,
    getBookingsController,
    updateBookingController
} from "../../controllers/booking";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {fieldsValidators} from "../../middleware/fields-validators";
import {validateBooking} from "../../utils/validate-booking";
import {RoleEnum} from "../../constant/role";

const router =  Router();

router.use([
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin, RoleEnum.Visitor ] )
])

/**
 * http://localhost:3002/booking/ [POST]
 */
router.post(
    '/',
    [
        ...validateBooking,
        fieldsValidators
    ],
    createBookingController
);

/**
 * http://localhost:3002/booking/:id [PUT]
 */
router.put(
    '/:id',
    [
        ...validateBooking,
        param('id', 'The id no is id valid').isMongoId(),
        fieldsValidators
    ],
    updateBookingController
);

router.use( checkRolPermit([RoleEnum.Admin]) )

/**
 * http://localhost:3002/booking/ [GET]
 */
router.get(
    '/',
    getBookingsController
);


/**
 * http://localhost:3002/booking/:delete [PUT]
 */
router.delete(
    '/:id',
    [
        param('id', 'The id no is id valid').isMongoId(),
        fieldsValidators
    ],
    deleteBookingController
);


export { router }