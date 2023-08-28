import { Router} from "express";
import {check, param} from "express-validator";

import {
    getRolesController,
    createRoleController,
    updateRoleController,
    deleteRoleController
} from "../../controllers/role";

import {checkJWT, checkRolPermit} from "../../middleware/session";

import {RoleEnum} from "../../constant/role";
import {fieldsValidators} from "../../middleware/fields-validators";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use([checkJWT, checkRolPermit([RoleEnum.Admin])]);

/**
 * @openapi
 * /api/role:
 *     get:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Authentication and User Profile
 *              - Roles
 *         summary: Get roles
 *         description: This API endpoint ensures that only administrators can view the available roles,<br/>
 *                      maintaining a secure and controlled access environment.<br/>
 *                      Access Control:<br/>
 *                      Only administrators can access this endpoint.<br/>
 *                      Other roles are not permitted to retrieve the list of roles.
 *         responses:
 *             '200':
 *                 description: View the list of roles our application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Roles'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/rolesResponse'
 *             '401':
 *                 description: Not authorized for view the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 */
router.get(
    '/',
    getRolesController
);

/**
 * @openapi
 * /api/role:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Authentication and User Profile
 *              - Roles
 *         summary: Create a new rol.
 *         description: This API endpoint enables administrators to create new roles within the system.
 *                      Only users with the admin role have the authority to use this endpoint.
 *                      Additionally, the name of the role must be unique.<br/>
 *                      Access Control:<br/>
 *                      Only administrators can create roles using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Rol'
 *                     examples:
 *                         rolTesting:
 *                             $ref: '#/components/examples/rolCreated'
 *                         rolNameRepeat:
 *                             $ref: '#/components/examples/rolNameRepeat'
 *                         rolNoField:
 *                             $ref: '#/components/examples/errorFieldBody'
 *         responses:
 *             '200':
 *                 description: Rol created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Roles'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/rolCreatedSuccess'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '409':
 *                 description: Not authorized for view the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 *             '500':
 *                 description: Error with name repeat or fails in database
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Database'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/rolNameRepeatResponse'
 */
router.post(
    '/',
    [
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty(),
        check('description', MessageErrorsEnum.DescriptionIsTooShort)
            .isLength({min: 6}),
        fieldsValidators,
    ],
    createRoleController
)

/**
 * @openapi
 * /api/role/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the rol to update
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Authentication and User Profile
 *              - Roles
 *         summary: Update a rol with the id.
 *         description: This API endpoint allows administrators to update roles within the system.
 *                      Only users with the admin role are permitted to use this endpoint.
 *                      The role's name must remain unique, and it cannot be changed.<br/>
 *                      Access Control:<br/>
 *                      Only administrators can update roles using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/RolUpdate'
 *                     examples:
 *                         rolUpdated:
 *                             $ref: '#/components/examples/rolUpdated'
 *                         rolShortDescription:
 *                             $ref: '#/components/examples/rolUpdatedShortDescription'
 *                         rolNoField:
 *                             $ref: '#/components/examples/errorFieldBody'
 *         responses:
 *             '200':
 *                 description: Rol update successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Roles'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/rolUpdatedSuccess'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '409':
 *                 description: Not authorized for view the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.put(
    '/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId)
        ,
        check('description', MessageErrorsEnum.DescriptionIsTooShort).isLength({min: 6}),
        fieldsValidators,
    ],
    updateRoleController
)

/**
 * @openapi
 * /api/role/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the rol to delete
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Authentication and User Profile
 *              - Roles
 *         summary: Delete a rol with the id.
 *         description: This API endpoint empowers administrators to remove roles from the system,
 *                      maintaining a controlled and organized user role structure.
 *                      Exclusive access is granted to users with the admin role to ensure
 *                      the security and consistency of role management.<br />
 *                      Access Control:<br />
 *                      Only users with the admin role can delete roles using this endpoint.
 *         responses:
 *             '200':
 *                 description: Rol delete successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Roles'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/rolDeletedSuccess'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '409':
 *                 description: Not authorized for view the user by id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.delete(
    '/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId)
        ,
        fieldsValidators,
    ],
    deleteRoleController
)

export { router }