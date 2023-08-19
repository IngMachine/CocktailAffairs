import { Router} from "express";
import {check, param} from "express-validator";

import {
    getUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from "../../controllers/user";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {fieldsValidators} from "../../middleware/fields-validators";
import {RoleEnum} from "../../constant/role";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use(
    [
        checkJWT,
        checkRolPermit([RoleEnum.Admin, RoleEnum.Visitor])
    ]
);

/**
 * @openapi
 * /api/user/{id}:
 *     get:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the user
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - users
 *         summary: Get user by id
 *         description: This endpoint allows administrators and users with visitor roles to retrieve
 *                      detailed information about a specific user based on their ID.
 *                      <br>Only administrators and users with visitor roles can access this information.
 *                      <br>    * Administrators can retrieve information for any user.
 *                      <br>    * Users with visitor roles can only retrieve their own information (based on the token).
 *         responses:
 *             '200':
 *                 description: view data the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/userView'
 *                         examples:
 *                             userTest:
 *                                 $ref: '#/components/examples/userViewResponse'
 *             '400':
 *                 description: Errors occurred creating user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorsField'
 *                         examples:
 *                             userViewErrorId:
 *                                 $ref: '#/components/examples/userViewErrorId'
 *             '401':
 *                 description: Not authorized for view the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 */
router.get(
    '/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    getUserByIdController
)

/**
 * @openapi
 * /api/user/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the user
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - users
 *         summary: Update user by id
 *         description: You can only update it yourself or an administrator,
 *                      you can not change the email, password or role when you are not an administrator.
 *         responses:
 *             '200':
 *                 description: update information the user successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/userView'
 *                         examples:
 *                             userTest:
 *                                 $ref: '#/components/examples/userViewResponse'
 *             '400':
 *                 description: Errors occurred creating user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorsField'
 *                         examples:
 *                             userViewErrorId:
 *                                 $ref: '#/components/examples/userUpdateErrorId'
 *             '401':
 *                 description: Not authorized for update the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 */
router.put(
    '/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty()
            .isLength({min: 3}).withMessage(MessageErrorsEnum.NameIsTooShort),
        check('description', MessageErrorsEnum.DescriptionIsTooShort)
            .isLength({ min: 6}),
        fieldsValidators
    ],
    updateUserController
);

router.use( checkRolPermit([RoleEnum.Admin]))

/**
 * @openapi
 * /api/user/:
 *     get:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - users (admin)
 *         summary: Get users registered in the application
 *         description: We obtain all the users registered in the application but only for the admin role.
 *         responses:
 *             '200':
 *                 description: Get users registered in the application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/listUsers'
 *                         examples:
 *                             userTest:
 *                                 $ref: '#/components/examples/listUsersResponse'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '409':
 *                 description: Not authorized for update the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/errorResponse'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.get(
    '/',
    getUsersController
);

/**
 * http://localhost:3002/auth/login [DELETE]
 */
router.delete(
    '/:id',
    [
        param(':id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    deleteUserController
)

export { router }