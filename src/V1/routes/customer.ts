import {Router} from "express";

import {
    getCustomersControllers,
    getCustomerByIdUSerController,
    createCustomerController,
    createCustomerByIdUserController,
    updateCustomerByIdUserController,
    updateCustomerByIdController,
    deleteCustomerByIdController
} from "../../controllers/customer";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";
import {check, param} from "express-validator";
import {fieldsValidators} from "../../middleware/fields-validators";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use( [
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin, RoleEnum.Visitor ] )
]);

/**
 * @openapi
 * /api/customer/{idUser}:
 *     post:
 *         parameters:
 *         - name: idUser
 *           in: path
 *           description:  The idUser for create the customer
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Visitors
 *         summary: Create a the same customer
 *         description: This API endpoint enables visitors or users with the role of "visitor" to create new customer
 *                      profiles within the system. Users can input essential details about themselves, such as contact
 *                      information, preferences, and event requirements. This API empowers individuals to register
 *                      as customers and access the features of the platform for booking bartender services.<br/>
 *                      Access Control:<br/>
 *                      Only users with the "visitor" role can create customer profiles using this endpoint
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Customer Visitor'
 *                     examples:
 *                         CustomerVisitor:
 *                             $ref: '#/components/examples/Customer Visitor'
 *         responses:
 *             '201':
 *                 description: Customer created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer'
 *                         examples:
 *                             CustomerCreated:
 *                                 $ref: '#/components/examples/Customer Created'
 *             '400':
 *                 description: Errors occurred creating a new customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsField:
 *                                 $ref: '#/components/examples/Error Fields Customer'
 *                             errorCustomerCreatedWithThisUser:
 *                                 $ref: '#/components/examples/Error customer created with this user'
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
 *             '409':
 *                 description: Not authorized for created booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.post(
    '/:idUser',
    [
        param('idUser', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('phoneNumber', MessageErrorsEnum.PhoneNumberIsRequired)
            .not()
            .notEmpty(),
        check('shippingAddress', MessageErrorsEnum.ShippingAddressIsRequired)
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createCustomerByIdUserController
)

router.use( checkRolPermit( [ RoleEnum.Admin, RoleEnum.Customer] ));

/**
 * @openapi
 * /api/customer/{id}:
 *     get:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id for find the customer
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Customer
 *              - Admin
 *         summary: View information the customer for id
 *         description: This API endpoint allows users, both customers and admin users, to retrieve detailed
 *                      information about a specific customer profile based on their unique ID. Users can access
 *                      and review customer details, contact information, preferences, and booking history.
 *                      This API provides transparency and accessibility to ensure effective communication
 *                      and coordination between customers, bartenders, and event organizers.<br/>
 *                      Access Control:<br/>
 *                      Customers can access their own profile information.<br/>
 *                      Admin users can access any customer profile.
 *         responses:
 *             '200':
 *                 description: Customer view information successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer View'
 *                         examples:
 *                             CustomerView:
 *                                 $ref: '#/components/examples/Customer View'
 *             '400':
 *                 description: Errors occurred creating a new booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
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
 *                 description: Id not found for view the information
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Error customer not found'
 *             '409':
 *                 description: Not authorized for created booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
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
    getCustomerByIdUSerController
)


/**
 * @openapi
 * /api/customer:
 *     put:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Customer
 *              - Admin
 *         summary: Update information with the id
 *         description: This API endpoint allows registered customers to update their own customer profiles within
 *                      the system. Customers can modify their contact information, preferences, and other details
 *                      to ensure accuracy and relevance. This API empowers customers to maintain up-to-date profiles,
 *                      enhancing their ability to seamlessly coordinate bartender services for their events.<br/>
 *                      Access Control:<br/>
 *                      Customers can update their own profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         oneOf:
 *                             - $ref: '#/components/schemas/Customer Updated Admin'
 *                             - $ref: '#/components/schemas/Customer Updated Customer'
 *                     examples:
 *                         admin:
 *                             $ref: '#/components/examples/Customer Updated Admin'
 *                         customer:
 *                             $ref: '#/components/examples/Customer Visitor'
 *         responses:
 *             '200':
 *                 description: Customer created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer'
 *                         examples:
 *                             CustomerCreated:
 *                                 $ref: '#/components/examples/Customer Created'
 *             '400':
 *                 description: Errors occurred updating the customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/Error Fields Customer'
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
 *                 description: Id not found for update the information
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Error customer not found'
 *             '409':
 *                 description: Not authorized for created customer
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
        check('phoneNumber', MessageErrorsEnum.PhoneNumberIsRequired)
            .not()
            .notEmpty(),
        check('shippingAddress', MessageErrorsEnum.ShippingAddressIsRequired)
            .not()
            .notEmpty(),
        check('user')
            .optional()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    updateCustomerByIdUserController
)

router.use( checkRolPermit( [RoleEnum.Admin] ));

/**
 * @openapi
 * /api/customer:
 *     get:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Admin
 *         summary: Get all customers
 *         description: This API endpoint allows administrators to retrieve a list of customer profiles within the
 *                      system. Admin users can access detailed information about registered customers, including
 *                      contact details, preferences, and booking history. This API provides administrators with
 *                      visibility into customer interactions, enabling effective communication and coordination
 *                      between customers and bartender services.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can access this endpoint.
 *         responses:
 *             '200':
 *                 description: Get all customers successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Customer'
 *                         examples:
 *                             ListCustomer:
 *                                 $ref: '#/components/examples/List Customer'
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
 *                 description: Not authorized for created customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.get(
    '/',
    getCustomersControllers
);


/**
 * @openapi
 * /api/customer:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Admin
 *         summary: Create a any customer from admin
 *         description: This API endpoint allows administrators to create new customer profiles
 *                      within the system. Admin users can input essential details about customers,
 *                      including contact information, preferences, and event requirements. This API empowers
 *                      administrators to efficiently manage and maintain accurate customer profiles, enhancing
 *                      the overall experience of coordinating bartender services for various events.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can create customer profiles using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Customer Updated Admin'
 *                     examples:
 *                         Customer Updated Admin:
 *                             $ref: '#/components/examples/Customer Updated Admin'
 *         responses:
 *             '201':
 *                 description: Customer created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer'
 *                         examples:
 *                             CustomerCreated:
 *                                 $ref: '#/components/examples/Customer Created'
 *             '400':
 *                 description: Errors occurred creating a new customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsField:
 *                                 $ref: '#/components/examples/Error Fields Customer'
 *                             errorCustomerCreatedWithThisUser:
 *                                 $ref: '#/components/examples/Error customer created with this user'
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
 *                 description: Not authorized for created booking
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
        check('user', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('phoneNumber', MessageErrorsEnum.PhoneNumberIsRequired)
            .not()
            .notEmpty(),
        check('shippingAddress', MessageErrorsEnum.ShippingAddressIsRequired)
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    createCustomerController
)

/**
 * @openapi
 * /api/customer/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id for update the customer
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Admin
 *         summary: Update customer for id from admin
 *         description: This API endpoint allows administrators to update existing customer profiles
 *                      within the system based on their unique ID. Admin users can modify customer contact information,
 *                      preferences, and other details to ensure accurate and up-to-date profiles. This API empowers
 *                      administrators to maintain high-quality customer interactions and streamline the coordination
 *                      of bartender services for various events.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can update customer profiles using this endpoint
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Customer Visitor'
 *                     examples:
 *                         CustomerVisitor:
 *                             $ref: '#/components/examples/Customer Visitor'
 *         responses:
 *             '201':
 *                 description: Customer updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer'
 *                         examples:
 *                             CustomerCreated:
 *                                 $ref: '#/components/examples/Customer Created'
 *             '400':
 *                 description: Errors occurred creating a new customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsField:
 *                                 $ref: '#/components/examples/Error Fields Customer'
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
 *                 description: Id not found for update the information the customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Error customer not found'
 *             '409':
 *                 description: Not authorized for created booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             userNotAuthorized:
 *                                 $ref: '#/components/examples/errorAuthorizationResponse'
 */
router.put('/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId(),
        check('user', MessageErrorsEnum.UserRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('phoneNumber', MessageErrorsEnum.PhoneNumberIsRequired)
            .not()
            .notEmpty(),
        check('shippingAddress', MessageErrorsEnum.ShippingAddressIsRequired)
            .not()
            .notEmpty(),
        fieldsValidators
    ],
    updateCustomerByIdController
);

/**
 * @openapi
 * /api/customer/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id for delete the customer
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Customers
 *              - Admin
 *         summary: Update customer for id from admin
 *         description: This API endpoint allows administrators to update existing customer profiles
 *                      within the system based on their unique ID. Admin users can modify customer contact information,
 *                      preferences, and other details to ensure accurate and up-to-date profiles. This API empowers
 *                      administrators to maintain high-quality customer interactions and streamline the coordination
 *                      of bartender services for various events.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can update customer profiles using this endpoint
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Customer Visitor'
 *                     examples:
 *                         CustomerVisitor:
 *                             $ref: '#/components/examples/Customer Visitor'
 *         responses:
 *             '201':
 *                 description: Customer deleted successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Customer'
 *                         examples:
 *                             CustomerCreated:
 *                                 $ref: '#/components/examples/Customer Created'
 *             '400':
 *                 description: Errors occurred creating a new customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
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
 *                 description: Id not found for update the information the customer
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Error customer not found'
 *             '409':
 *                 description: Not authorized for created booking
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
    deleteCustomerByIdController
)

export { router }