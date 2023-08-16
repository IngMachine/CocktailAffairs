// TODO: Faltan validaciones en este archivo por las imagenes
import {Router} from "express";

import {
    createBartenderByIdUserController,
    createBartenderController,
    getBartendersController,
    updateBartenderByIdUserController,
    updateBartenderByIdController,
    deleteBartenderByIdController
} from "../../controllers/bartender";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";
import fileUpload from "express-fileupload";

const router =  Router();


/**
 * http://localhost:3002/bartender/ [GET]
 */
router.get(
    '/',
    getBartendersController
);

router.use(checkJWT);

router.use( checkRolPermit( [ RoleEnum.Admin, RoleEnum.Bartender ] ) );

/**
 * http://localhost:3002/bartender/:idUser [POST]
 */
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

router.put(
    '/',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    updateBartenderByIdUserController
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

router.put(
    '/:id',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    updateBartenderByIdController
);

router.delete(
    '/:id',
    deleteBartenderByIdController
)

export { router }