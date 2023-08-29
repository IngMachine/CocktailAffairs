import {Router} from "express";

import {
    createBartenderByIdUserController,
    createBartenderController,
    getBartendersController,
    updateBartenderByIdUserController,
    updateBartenderByIdController,
    deleteBartenderByIdController
} from "../../controllers/bartender";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";
import fileUpload from "express-fileupload";
import {param} from "express-validator";
import {fieldsValidators} from "../../middleware/fields-validators";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

/**
 * @openapi
 * /api/bartender:
 *     get:
 *         tags:
 *           - Book Bartender Services
 *         summary: Get a list of bartenders available
 *         description: This API endpoint allows anyone to retrieve a list of bartender
 *                      profiles within the system. Users, regardless of their role or authentication status,
 *                      can access this public information to explore and discover the skilled bartenders
 *                      available for hire. This openness ensures transparency and accessibility for all users
 *                      interested in finding the perfect bartender for their events.<br/>
 *                      Access Control:<br/>
 *                      Public access; no authentication is required
 *         responses:
 *             '200':
 *                 description: View the list of bartenders available in our application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Bartenders'
 *                         examples:
 *                             ListBartenders:
 *                                 $ref: '#/components/examples/List Bartenders'
 */
router.get(
    '/',
    getBartendersController
);

router.use( [
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin, RoleEnum.Bartender ] )
]);

/**
 * @openapi
 * /api/bartender/{idUserBartender}:
 *     post:
 *         parameters:
 *         - name: idUserBartender
 *           in: path
 *           description:  The id of (role the bartender) for created a bartender
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bartender
 *         summary: Create a bartender (role bartender)
 *         description: This API endpoint allows administrators to create new bartender profiles within the system.
 *                      Admin users can input essential details about bartenders, such as their skills, experience,
 *                      and availability. This API ensures that the roster of bartenders is comprehensive
 *                      and accurately reflects the talent pool, facilitating seamless bookings of skilled bartenders
 *                      for various events and occasions.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can create bartender profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Bartender Created'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '201':
 *                 description: Bartender created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Bartender'
 *                         examples:
 *                             Bartender:
 *                                 $ref: '#/components/examples/Bartender Created'
 *             '400':
 *                 description: Errors occurred creating a new bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field JOI'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/errorInIdParam'
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Errors Field Bartender'
 *             '401':
 *                 description: Errors occurred creating a new bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/Error no authorized created bartender'
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
 *                 description: Not authorized for created bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.post(
    '/:idUserBartender',
    [
        param('idUserBartender', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators,
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    createBartenderByIdUserController
)

/**
 * @openapi
 * /api/bartender:
 *     put:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bartender
 *         summary: Update a bartender (role bartender)
 *         description: This API endpoint allows bartenders to update their own profiles within the system.
 *                      Bartender users can modify their essential details, such as skills, availability,
 *                      and contact information. This API empowers bartenders to keep their profiles current
 *                      and accurately reflect their expertise, enhancing their opportunities for bookings at
 *                      various events and gatherings.<br/>
 *                      Access Control:<br/>
 *                      Bartenders can only update their own profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Bartender Updated'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '200':
 *                 description: Bartender update successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Bartender'
 *                         examples:
 *                             Bartender:
 *                                 $ref: '#/components/examples/Bartender Created'
 *             '400':
 *                 description: Errors occurred updating a bartender for user id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field JOI'
 *                         examples:
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Errors Field Bartender'
 *             '401':
 *                 description: Errors occurred creating a new bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/Error no authorized created bartender'
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
 *                 description: User not found for update bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotFound:
 *                                 $ref: '#/components/examples/userNotFound'
 *             '409':
 *                 description: Not authorized for created bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.put(
    '/',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    updateBartenderByIdUserController
)

router.use( checkRolPermit( [RoleEnum.Admin] ));

/**
 * @openapi
 * /api/bartender:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bartender
 *              - Admin
 *         summary: Create a bartender from admin (role admin)
 *         description: This API endpoint enables administrators to create new bartender profiles within the system.
 *                      Admin users can input essential details about bartenders, including their skills, experience,
 *                      and availability. This API ensures that the roster of bartenders is comprehensive and
 *                      accurately reflects the talent pool, facilitating seamless bookings of skilled bartenders
 *                      for various events and occasions.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can create bartender profiles using this endpoint
 *                      Bartenders can only update their own profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Bartender Created Admin'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '201':
 *                 description: Bartender create successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Bartender'
 *                         examples:
 *                             Bartender:
 *                                 $ref: '#/components/examples/Bartender Created'
 *             '400':
 *                 description: Errors occurred creating a bartender for fields incomplete
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field JOI'
 *                         examples:
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Errors Field Bartender'
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
 *                 description: Not authorized for created bartender
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
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    createBartenderController
)

/**
 * @openapi
 * /api/bartender/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of bartender for update
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bartender
 *              - Admin
 *         summary: update a bartender from admin for id of bartender (role admin)
 *         description: This API endpoint allows administrators to update existing bartender profiles within the system.
 *                      Admin users can modify essential details about bartenders, ensuring accurate
 *                      and up-to-date information. This API enables administrators to maintain a dynamic and relevant
 *                      roster of bartenders, enhancing the quality of bartender services available for
 *                      booking at various events and occasions.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can update bartender profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Bartender Updated'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '200':
 *                 description: Bartender create successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Bartender'
 *                         examples:
 *                             Bartender:
 *                                 $ref: '#/components/examples/Bartender Created'
 *             '400':
 *                 description: Errors occurred creating a bartender for fields incomplete
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field JOI'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/errorInIdParam'
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Errors Field Bartender'
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
 *                 description: User not found for update bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotFound:
 *                                 $ref: '#/components/examples/userNotFound'
 *             '409':
 *                 description: Not authorized for created bartender
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
        fieldsValidators,
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    updateBartenderByIdController
);

/**
 * @openapi
 * /api/bartender/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of bartender for delete
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bartender
 *              - Admin
 *         summary: delete a bartender from admin for id of bartender (role admin)
 *         description: This API endpoint allows administrators to delete bartender profiles from the CocktailAffairs
 *                      application. Admin users have the authority to manage and remove bartender information
 *                      as needed. This API contributes to maintaining an accurate and up-to-date record of active
 *                      bartender profiles.<br/>
 *                      Access Control:<br/>
 *                      Only admin users can delete bartender profiles using this endpoint.
 *         responses:
 *             '200':
 *                 description: Bartender delete successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Bartender'
 *                         examples:
 *                             Bartender:
 *                                 $ref: '#/components/examples/Bartender Created'
 *             '400':
 *                 description: Errors occurred deleting a bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/errorInIdParam'
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
 *                 description: User not found for delete bartender
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotFound:
 *                                 $ref: '#/components/examples/userNotFound'
 *             '409':
 *                 description: Not authorized for created bartender
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
    deleteBartenderByIdController
)

export { router }