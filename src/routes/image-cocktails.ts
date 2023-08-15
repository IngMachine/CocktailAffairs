// TODO: Faltan validaciones en este archivo por las imagenes
import {Router} from "express";

import {checkJWT, checkRolPermit} from "../middleware/session";

import fileUpload from "express-fileupload";

import {
    deleteImageCocktailController,
    getImagesCocktailsController,
    updateImageCocktailController,
    uploadImageCocktailController
} from "../controllers/image-cocktails";
import {RoleEnum} from "../constant/role";

import { check }  from "express-validator";
import {fieldsValidators} from "../middleware/fields-validators";

const router =  Router();

/**
 * http://localhost:3002/api/cocktail/image-cocktails [GET]
 */
router.get(
    '/',
    getImagesCocktailsController
)

router.use( [
    checkJWT,
    checkRolPermit([RoleEnum.Admin, RoleEnum.Bartender])
] );

/**
 * http://localhost:3002/api/cocktail/upload-image [POST]
 */
router.post(
    '/',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    uploadImageCocktailController
)

router.put(
    '/:id',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    updateImageCocktailController
)

router.use( checkRolPermit([RoleEnum.Admin]) );

router.delete(
    '/:id',
    deleteImageCocktailController
)

export { router }