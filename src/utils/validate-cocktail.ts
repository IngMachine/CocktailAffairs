import { check } from "express-validator";
import { enumValidator } from "./enum-validator";
import { Size, GlassType } from "../interfaces/cocktails.interface";

export const validateCocktail = [
    check('name', 'The name of the cocktail is required').not().notEmpty(),
    check('description', 'The description of the cocktail is required').not().notEmpty(),
    check('size').custom((value) => enumValidator(Size, value)),
    check('preparation', 'The name of the preparation is required').not().notEmpty(),
    check('glassType').custom((value) => enumValidator(GlassType, value)),
    check('ingredients', 'At least one ingredient must be added').isArray({ min: 1 }),
    check('alcoholic', 'Is alcoholic is required and the type boolean').not().notEmpty().isBoolean(),
    check('price', 'The price is required').not().notEmpty().isNumeric(),
    check('imageCocktail', 'The image of the cocktail is required').not().notEmpty().isMongoId(),
];
