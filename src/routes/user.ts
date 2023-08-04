import { Router} from "express";

import {
    getUsersController,
    getUserController,
    updateUserController,
    deleteUserController
} from "../controllers/user";

import {checkJWT} from "../middleware/session";

const router =  Router();

router.use(checkJWT);

/**
 * http://localhost:3002/user/ [GET]
 */
router.get(
    '/',
    getUsersController
);

router.get(
    '/:id',
    getUserController
)

/**
 * http://localhost:3002/user/:id [PUT]
 */
router.put(
    '/:id',
    updateUserController
);

/**
 * http://localhost:3002/auth/login [DELETE]
 */
router.delete(
    '/:id',
    deleteUserController
)

export { router }