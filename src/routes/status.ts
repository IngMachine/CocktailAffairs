import { Router} from "express";

import {
    getStatusController,
    updateStatusController,
    createStatusController,
    deleteStatusController
} from "../controllers/status";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";

const router =  Router();

router.use([checkJWT, checkRolPermit([RoleEnum.Admin])]);

/**
 * http://localhost:3002/role/ [GET]
 */
router.get(
    '/',
    getStatusController
);

/**
 * http://localhost:3002/role/ [POST]
 */
router.post(
    '/',
    createStatusController
)

/**
 * http://localhost:3002/role/id [PUT]
 */
router.put(
    '/:id',
    updateStatusController
)

/**
 * http://localhost:3002/role/id [DELETE]
 */
router.delete(
    '/:id',
    deleteStatusController
)

export { router }