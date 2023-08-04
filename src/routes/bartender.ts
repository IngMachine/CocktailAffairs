import {Router} from "express";

import {
    getBartendersController,
    createBartenderController
} from "../controllers/bartender";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {RoleEnum} from "../constant/role";
import fileUpload from "express-fileupload";

const router =  Router();

router.use(checkJWT);


/**
 * http://localhost:3002/bartender/ [GET]
 */
router.get(
    '/',
    getBartendersController
);

router.use(
    [
        checkRolPermit(
            [
                RoleEnum.Admin
            ]
        )
    ]
);

/**
 * http://localhost:3002/bartender/ [POST]
 */
router.post(
    '/',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    createBartenderController
)

export { router }