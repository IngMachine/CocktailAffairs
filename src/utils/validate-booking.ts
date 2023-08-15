import {check} from "express-validator";
import {isMongoIdOfArrayOptionalValidator, isMongoIdOptionalValidator} from "./is-mongo-id-validator";

export const validateBooking = [
    check('user')
        .optional()
        .custom( value => isMongoIdOptionalValidator(value))
        .withMessage('Not valid user id '),
    check('bartender')
        .optional()
        .custom( value => isMongoIdOfArrayOptionalValidator(value))
        .withMessage('Some bartender id not valid'),
    check('eventDate', 'The event date is required')
        .not()
        .notEmpty()
        .isISO8601().toDate().withMessage('The event date no is format valid'),
    check('eventTime', 'The event time is required')
        .not()
        .notEmpty()
        .isISO8601().toDate().withMessage('The event time no is format valid'),
    check('duration', 'The duration is required')
        .not()
        .notEmpty()
        .isNumeric().withMessage('The duration is numeric, not format valid'),
    check('location')
        .optional()
        .isLength({min: 5}).withMessage('The location is too short'),
    check('guestCount', 'The guest count is required')
        .not()
        .notEmpty()
        .isNumeric().withMessage('The guest count is numeric, not format'),
]