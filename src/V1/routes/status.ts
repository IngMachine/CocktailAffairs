import { Router} from "express";

import {
    getStatusController,
    updateStatusController,
    createStatusController,
    deleteStatusController
} from "../../controllers/status";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";
import {check, param} from "express-validator";
import {fieldsValidators} from "../../middleware/fields-validators";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use(checkJWT);

/**
 * @openapi
 * /api/status:
 *     get:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Shared
 *              - Status
 *         summary: Get all the status information
 *         description: This API endpoint allows users to retrieve a list of status values that represent different
 *                      states or stages within the CocktailAffairs application. Users can access predefined
 *                      status definitions, such as "Pending," "In Progress," "Completed," "Cancelled," etc.,
 *                      depending on the context in which status values are used. This API provides a standardized
 *                      way to track and communicate the progress of various entities or processes.<br/>
 *                      Access Control:<br/>
 *                      The "Get Status" API can be accessible to all users, including visitors, customers,
 *                      bartenders, and administrators.
 *         responses:
 *             '200':
 *                 description: View the list of status our application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Status'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/List Status'
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
    getStatusController
);

router.use([checkJWT, checkRolPermit([RoleEnum.Admin])]);

/**
 * @openapi
 * /api/status:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Shared
 *              - Status
 *              - Admin
 *         summary: Create a new status
 *         description: This API endpoint allows administrators to create new status values that represent different
 *                      states or stages within the CocktailAffairs application. Admin users can define custom status
 *                      definitions based on the specific needs of the system. These status values can be used to
 *                      track and communicate the progress of various entities or processes, ensuring transparency
 *                      and effective management.<br/>
 *                      Access Control:<br/>
 *                      Only admin users can create new status values using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Status Request'
 *                     examples:
 *                         orderCreatedAdmin:
 *                             $ref: '#/components/examples/Status Request'
 *         responses:
 *             '200':
 *                 description: View the list of status our application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Status'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/List Status'
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
 *                 description: Not authorized for create a status
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.post(
    '/',
    [
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty(),
        check('description', MessageErrorsEnum.DescriptionIsRequired)
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createStatusController
)

/**
 * @openapi
 * /api/status/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the status to update
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Shared
 *              - Status
 *              - Admin
 *         summary: Update a status for id
 *         description: This API endpoint allows administrators to update existing status values within the
 *                      CocktailAffairs application. Admin users can modify the details of predefined status
 *                      definitions, such as name or description, based on the evolving needs of the system.
 *                      This API ensures that status values remain accurate and relevant, contributing to transparent
 *                      communication and effective management.<br/>
 *                      Access Control:<br/>
 *                      Only admin users can update status values using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Status Request'
 *                     examples:
 *                         orderCreatedAdmin:
 *                             $ref: '#/components/examples/Status Request'
 *         responses:
 *             '200':
 *                 description: Update status successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Status'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/Status'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '404':
 *                 description: Status not found
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotFound:
 *                                 $ref: '#/components/examples/Status Not Found'
 *             '409':
 *                 description: Not authorized for create a status
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
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('name', MessageErrorsEnum.NameIsRequired)
            .not()
            .notEmpty(),
        check('description', MessageErrorsEnum.DescriptionIsRequired)
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    updateStatusController
)

/**
 * @openapi
 * /api/status/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the status to delete
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Shared
 *              - Status
 *              - Admin
 *         summary: Delete a status for id
 *         description: This API endpoint allows administrators to delete existing status values within the
 *                      CocktailAffairs application. Admin users can remove status definitions that are no
 *                      longer needed or relevant. This API ensures that the list of status values remains
 *                      organized and up-to-date, contributing to transparent communication
 *                      and effective management.<br/>
 *                      Access Control:<br/>
 *                      Only admin users can delete status values using this endpoint.
 *         responses:
 *             '200':
 *                 description: Delete status successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Status'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/Status'
 *             '403':
 *                 description: Session not valid
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNoSession:
 *                                 $ref: '#/components/examples/userNoSession'
 *             '404':
 *                 description: Status not found
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotFound:
 *                                 $ref: '#/components/examples/Status Not Found'
 *             '409':
 *                 description: Not authorized for create a status
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
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    deleteStatusController
)

export { router }