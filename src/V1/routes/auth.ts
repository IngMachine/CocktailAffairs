import { Router} from 'express';
import {check} from 'express-validator';

import {fieldsValidators} from '../../middleware/fields-validators';

import {
    loginController,
    registerController
} from '../../controllers/auth';

import {isMongoIdOfArrayOptionalValidator} from '../../utils/is-mongo-id-validator';

const router =  Router();

/**
 * @openapi
 * /api/auth/register:
 *     post:
 *         tags:
 *           - users
 *         summary: Register a new user
 *         description: This endpoint enables new users to create an account in the CocktailAffray system.
 *                      Users can provide their registration details, such as their name, email, and chosen password.
 *                      Upon successful registration, users will be able to log in and access the various
 *                      features of the application.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/user'
 *                     examples:
 *                         userBasic:
 *                             $ref: '#/components/examples/createUserBasic'
 *                         userWithDescription:
 *                             $ref: '#/components/examples/createUserWithDescription'
 *                         userWithRole:
 *                             $ref: '#/components/examples/createUserWithRole'
 *                         userAlreadyExist:
 *                             $ref: '#/components/examples/userAlreadyExist'
 *                         userErrorInField:
 *                             $ref: '#/components/examples/userErrorInField'
 *                         userErrorInEmailFormat:
 *                             $ref: '#/components/examples/userErrorInEmailFormat'
 *         responses:
 *             '201':
 *                 description: User created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/userCreated'
 *                         examples:
 *                             userBasic:
 *                                 $ref: '#/components/examples/userBasicCreated'
 *                             userWithDescription:
 *                                 $ref: '#/components/examples/userWithDescription'
 *                             userWithRole:
 *                                 $ref: '#/components/examples/userWithRole'
 *             '400':
 *                 description: Errors occurred creating user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorsField'
 *                         examples:
 *                             userErrorsInField:
 *                                 $ref: '#/components/examples/userErrorsInFieldResponse'
 *                             userErrorInEmailFormat:
 *                                  $ref: '#/components/examples/userErrorInEmailFormatResponse'
 *             '409':
 *                 description: Already user created
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userAlreadyExistsResponse:
 *                                 $ref: '#/components/examples/userAlreadyExistsResponse'
 */
router.post(
    '/register',
    [
        check('name', 'The name is required').not().notEmpty(),
        check('password', 'The password is required').not().notEmpty()
            .isLength({min: 6}).withMessage('The password is minimum the 6 characters'),
        check('email', 'The email is required').not().notEmpty()
            .isEmail().withMessage('The email not valid format'),
        check('role').optional().isArray()
            .custom( value => isMongoIdOfArrayOptionalValidator(value)),
        fieldsValidators
    ],
    registerController
);

/**
 * http://localhost:3002/auth/login [POST]
 */
router.post('/login', loginController)

export { router }