import {Router} from "express";

import {
    createCocktailController,
    deleteCocktailController,
    getCocktailByIdController,
    getCocktailsController,
    updateCocktailController,
} from "../controllers/cocktails";

import {checkJWT, checkRolPermit} from "../middleware/session";
import {fieldsValidators} from "../middleware/fields-validators";

import {RoleEnum} from "../constant/role";
import {validateCocktail} from "../utils/validate-cocktail";
import {param} from "express-validator";

const router =  Router();


/**
 * http://localhost:3002/api/cocktail [GET]
 */
router.get('/', getCocktailsController);

/**
 * http://localhost:3002/api/cocktail/:id [GET]
 */
router.get(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    getCocktailByIdController
);

router.use([checkJWT, checkRolPermit([ RoleEnum.Admin, RoleEnum.Bartender ])]);

/**
 * http://localhost:3002/api/cocktail [POST]
 */
router.post(
    '/',
    [
        ...validateCocktail,
        fieldsValidators
    ],
    createCocktailController
);


/**
 * http://localhost:3002/api/cocktail/:id [PUT]
 */
router.put(
    '/:id',
    [
        ...validateCocktail,
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    updateCocktailController
);

router.use([ checkRolPermit([RoleEnum.Admin])]);

/**
 * http://localhost:3002/api/cocktail/:id [DELETE]
 */
router.delete(
    '/:id',
    [
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    deleteCocktailController
);

export { router }