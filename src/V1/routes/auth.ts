import { Router} from 'express';
import {check} from 'express-validator';

import {fieldsValidators} from '../../middleware/fields-validators';

import {
    loginController,
    registerController
} from '../../controllers/auth';

import {isMongoIdOfArrayOptionalValidator} from '../../utils/is-mongo-id-validator';
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

/**
 * @openapi
 * /api/auth/register:
 *     post:
 *         tags:
 *          - Authentication and User Profile
 *               - Users
 *         summary: Register a new user
 *         description: This endpoint enables new users to create an account in the CocktailAffray system.
 *                      Users can provide their registration details, such as their name, email, and chosen password.
 *                      Upon successful registration, users will be able to log in and access the various
 *                      features of the application.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/User'
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
 *                             $ref: '#/components/schemas/User Created'
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
 *                             $ref: '#/components/schemas/Errors Field'
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
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userAlreadyExistsResponse:
 *                                 $ref: '#/components/examples/userAlreadyExistsResponse'
 */
router.post(
    '/register',
    [
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty(),
        check('password', MessageErrorsEnum.PasswordIsRequired)
            .not()
            .notEmpty()
            .isLength({min: 6}).withMessage(MessageErrorsEnum.PasswordMinimumLength),
        check('email', MessageErrorsEnum.EmailIsRequired)
            .not()
            .notEmpty()
            .isEmail().withMessage(MessageErrorsEnum.EmailNotFormatValid),
        check('role').optional().isArray()
            .custom( value => isMongoIdOfArrayOptionalValidator(value)),
        fieldsValidators
    ],
    registerController
);

/**
 * @openapi
 * /api/auth/login:
 *     post:
 *         tags:
 *          - Authentication and User Profile
 *               - Users
 *         summary: Login a user
 *         description: With this endpoint, registered users can log into their CocktailAffray accounts.
 *                      By submitting their email and password, users can obtain an access token.
 *                      This token is necessary for secure access to protected areas of the application.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/User Login'
 *                     examples:
 *                         userAdmin:
 *                             $ref: '#/components/examples/userAdmin'
 *                         userTest:
 *                             $ref: '#/components/examples/userTest'
 *                         failedEmail:
 *                             $ref: '#/components/examples/failedEmail'
 *                         failedPassword:
 *                             $ref: '#/components/examples/failedPassword'
 *                         userLoginFieldFailed:
 *                             $ref: '#/components/examples/userLoginFieldFailed'
 *                         userLoginEmailFailed:
 *                             $ref: '#/components/examples/userLoginEmailFailed'
 *         responses:
 *             '200':
 *                 description: User created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/User Created'
 *                         examples:
 *                             userAdmin:
 *                                 $ref: '#/components/examples/userAdminResponse'
 *                             userTest:
 *                                 $ref: '#/components/examples/userTestResponse'
 *             '400':
 *                 description: Errors occurred creating user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             userLoginErrorField:
 *                                 $ref: '#/components/examples/userLoginErrorField'
 *                             userLoginErrorEmail:
 *                                  $ref: '#/components/examples/userLoginErrorEmail'
 *             '403':
 *                 description: Errors occurred creating user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             failedEmailOrPassword:
 *                                 $ref: '#/components/examples/userFailedEmailOrPassword'
 */
router.post(
    '/login',
    [
        check('email', MessageErrorsEnum.EmailIsRequired)
            .not()
            .notEmpty()
            .isEmail().withMessage(MessageErrorsEnum.EmailNotFormatValid),
        check('password', MessageErrorsEnum.PasswordIsRequired)
            .not()
            .notEmpty()
            .isLength({min: 6}).withMessage(MessageErrorsEnum.PasswordMinimumLength),
        fieldsValidators
    ],
    loginController
)

export { router }