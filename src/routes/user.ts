import { Router} from "express";

import {
    getUsersController,
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