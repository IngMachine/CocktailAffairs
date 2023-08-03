import { Router} from "express";

import {
    getRolesController,
    createRoleController
} from "../controllers/role";
import {checkJWT} from "../middleware/session";

const router =  Router();

router.use(checkJWT);

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
    (req, res) => res.json('put')
)

/**
 * http://localhost:3002/role/id [DELETE]
 */
router.delete(
    '/:id',
    (req, res) => res.json('delete')
)

export { router }