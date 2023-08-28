import { check } from "express-validator";
import { enumValidator } from "./enum-validator";
import { Size, GlassType } from "../interfaces/cocktails.interface";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const validateCocktail = [
    check('name', MessageErrorsEnum.NameCocktailRequired)
        .not()
        .notEmpty(),
    check('description', MessageErrorsEnum.DescriptionCocktailRequired)
        .not()
        .notEmpty(),
    check('size')
        .custom(
            (value) => enumValidator(Size, value)
        ),
    check('preparation', MessageErrorsEnum.PreparationRequired)
        .not()
        .notEmpty(),
    check('glassType')
        .custom(
            (value) => enumValidator(GlassType, value)
        ),
    check('ingredients', MessageErrorsEnum.IngredientMinimumOne)
        .isArray({ min: 1 }),
    check('alcoholic', MessageErrorsEnum.IsAlcoholicRequired)
        .not()
        .notEmpty()
        .isBoolean().withMessage(MessageErrorsEnum.IsTypeBoolean),
    check('price', MessageErrorsEnum.PriceIsRequired)
        .not()
        .notEmpty()
        .isNumeric().withMessage(MessageErrorsEnum.IsTypeNumeric),
    check('imageCocktail', MessageErrorsEnum.IdImageCocktailRequired)
        .not()
        .notEmpty()
        .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
];
