import { Router} from "express";

import {check} from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

import {
    getBookingController,
} from "../controllers/booking";
import {checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";

const router =  Router();

router.use( checkRolPermit([RoleEnum.Admin]))

/**
 * http://localhost:3002/booking/ [Get]
 */
router.post(
    '/',
    getBookingController
);

export { router }