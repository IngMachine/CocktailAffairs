import {Router} from "express";

import {
    createBartenderByIdUserController,
    createBartenderController,
    getBartendersController
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

/**
 * http://localhost:3002/bartender/:idUser [POST]
 */

router.use( checkRolPermit( [ RoleEnum.Admin, RoleEnum.Bartender ] ));

router.post(
    '/:idUser',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    createBartenderByIdUserController
)

router.use( checkRolPermit( [RoleEnum.Admin] ));

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