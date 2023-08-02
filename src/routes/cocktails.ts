import {Request, Response, Router} from "express";
import {check} from "express-validator";

import {
    createCocktail, deleteCocktailController,
    getCocktailsById,
    getCocktailsController,
    getImageController, updateCocktailController,
    uploadImage
} from "../controllers/cocktails";

import {checkJWT} from "../middleware/session";
import {fieldsValidators} from "../middleware/fields-validators";

import {enumValidator} from "../utils/enum-validator";
import {GlassType, Size} from "../interfaces/cocktails.interface";
import {RequestExtends} from "../interfaces/req-ext.interface";

const router =  Router();

router.use( checkJWT );

/**
 * http://localhost:3002/api/cocktail [GET]
 */
router.get('/', getCocktailsController);

/**
 * http://localhost:3002/api/cocktail/:id [GET]
 */
router.get('/:id', getCocktailsById);

/**
 * http://localhost:3002/api/cocktail [POST]
 */
router.post(
    '/',
    [
        check('name', 'The name of the cocktail is required').not().notEmpty(),
        check('description', 'The description of the cocktail is required').not().notEmpty(),
        check('size').custom( (value) => enumValidator(Size, value)),
        check('preparation', 'The name of the preparation is required').not().notEmpty(),
        check('glassType').custom( (value) => enumValidator(GlassType, value)),
        check('ingredients', 'At least one ingredient must be added').isArray({min: 1}),
        check('alcoholic', 'Is alcoholic is required and the type boolean').not().notEmpty().isBoolean(),
        check('price', 'The price is required').not().notEmpty().isNumeric(),
        check('imageCocktail', 'The image of the cocktail is required').not().notEmpty().isMongoId(),
        fieldsValidators
    ],
    // @ts-ignore
    createCocktail
);


/**
 * http://localhost:3002/api/cocktail/:id [PUT]
 */
router.put(
    '/:id',
    [
            check('name', 'The name of the cocktail is required').not().notEmpty(),
            check('description', 'The description of the cocktail is required').not().notEmpty(),
            check('size').custom( (value) => enumValidator(Size, value)),
            check('preparation', 'The name of the preparation is required').not().notEmpty(),
            check('glassType').custom( (value) => enumValidator(GlassType, value)),
            check('ingredients', 'At least one ingredient must be added').isArray({min: 1}),
            check('alcoholic', 'Is alcoholic is required and the type boolean').not().notEmpty().isBoolean(),
            check('price', 'The price is required').not().notEmpty().isNumeric(),
            check('imageCocktail', 'The image of the cocktail is required').not().notEmpty().isMongoId(),
            fieldsValidators
    ],
    // @ts-ignore
    updateCocktailController
);

/**
 * http://localhost:3002/api/cocktail/:id [DELETE]
 */
router.delete(
    '/:id',
    deleteCocktailController
);

/**
 * http://localhost:3002/api/cocktail/image-cocktail [GET]
 */
router.get('/image-cocktail', getImageController)

/**
 * http://localhost:3002/api/cocktail/upload-image [POST]
 */
router.post(
    '/upload-image',
    uploadImage
)

export { router }