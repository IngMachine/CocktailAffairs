import { Router} from "express";

import {
    getRolesController,
    createRoleController,
    updateRoleController,
    deleteRoleController
} from "../controllers/role";

import {checkJWT, checkRolPermit} from "../middleware/session";

import {RoleEnum} from "../constant/role";

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
    createRoleController
)

/**
 * http://localhost:3002/role/id [PUT]
 */
router.put(
    '/:id',
    updateRoleController
)

/**
 * http://localhost:3002/role/id [DELETE]
 */
router.delete(
    '/:id',
    deleteRoleController
)

export { router }