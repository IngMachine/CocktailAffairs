import { Router} from "express";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {RoleEnum} from "../../constant/role";

import {
    getOrdersController,
    getOrdersByUserController,
    getOrderByIdController,
    createOrderController,
    updateOrderByIdController,
    deleteOrderByIdController
} from "../../controllers/order";

import {check, param} from "express-validator";
import {fieldsValidators} from "../../middleware/fields-validators";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use([
    checkJWT,
    checkRolPermit([RoleEnum.Admin, RoleEnum.Customer])
])

/**
 * @openapi
 * /api/order/{id}:
 *     get:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the order to view
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Order
 *              - Customer
 *              - Admin
 *         summary: View the information about the order for id
 *         description: This API endpoint allows registered customers to retrieve detailed information about a
 *                      specific order based on its unique ID. Customers can access and review order details,
 *                      event information, bartender assignments, payment status, and more. This API provides
 *                      transparency and accessibility, ensuring effective communication and coordination for
 *                      customers' events.<br/>
 *                      Access Control:<br/>
 *                      Customers can access their own order information.
 *         responses:
 *             '200':
 *                 description: View order for the id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Order'
 *                         examples:
 *                             orderView:
 *                                 $ref: '#/components/examples/Order View'
 *             '400':
 *                 description:
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorInIdParam:
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
 *                 description: Errors occurred view order for id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Errors Order Not Found'
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
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    getOrderByIdController
);

/**
 * @openapi
 * /api/order/byIdUser/{idUser}:
 *     get:
 *         parameters:
 *         - name: idUser
 *           in: path
 *           description:  The idUser of the all order to view
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Order
 *              - Customer
 *              - Admin
 *         summary: View the all orders for id user
 *         description: This API endpoint allows registered customers to retrieve a list of their own orders based
 *                      on their unique user ID. Customers can access and review details of orders they have placed,
 *                      including event information, bartender assignments, payment status, and more.
 *                      This API provides customers with visibility into their order history, enabling effective event
 *                      coordination and communication.<br/>
 *                      Access Control:<br/>
 *                      Customers can access their own order history.
 *         responses:
 *             '200':
 *                 description: Order view id user successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Orders'
 *                         examples:
 *                             orderView:
 *                                 $ref: '#/components/examples/List Orders'
 *             '400':
 *                 description:
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorInIdParam:
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
 *                 description: Errors occurred view order for id user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Errors Order Not Found'
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
    '/byIdUser/:idUser',
    [
        param('idUser', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    getOrdersByUserController
)

/**
 * @openapi
 * /api/order:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Order
 *              - Customer
 *              - Admin
 *         summary: Create a order form roles (customers or admin)
 *         description: This API endpoint allows registered customers to create new orders for bartender services.
 *                      Customers can specify event details, select preferred bartenders, and provide necessary
 *                      information for a successful order. This API streamlines the process of booking bartender
 *                      services, ensuring a seamless experience for event organizers and hosts.<br/>
 *                      Access Control:<br/>
 *                      Customers can create orders using this endpoint.
 *         responses:
 *             '201':
 *                 description: Order created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             oneOf:
 *                                 - $ref: '#/components/schemas/Order Created Customer'
 *                                 - $ref: '#/components/schemas/Order Created Admin'
 *                         examples:
 *                             orderCreatedCustomer:
 *                                 $ref: '#/components/examples/Order Created Customer'
 *                             orderCreatedAdmin:
 *                                 $ref: '#/components/examples/Order Created Admin'
 *             '400':
 *                 description:
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsField:
 *                                 $ref: '#/components/examples/Errors Fields Order'
 *                             customerNotFound:
 *                                 $ref: '#/components/examples/Customer not found for the order'
 *                             bookingAlready:
 *                                 $ref: '#/components/examples/Booking already with order'
 *                             BookingNotBelongUserId:
 *                                 $ref: '#/components/examples/The Booking does not belong to this user id'
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
        check('user')
            .optional()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('booking', MessageErrorsEnum.BookingRequired)
            .not().notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('status')
            .optional()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('totalAmount')
            .optional()
            .isNumeric().withMessage(MessageErrorsEnum.TheKindOfDataNotIsValid),
        fieldsValidators
    ],
    createOrderController
);



router.use( checkRolPermit([RoleEnum.Admin]));

/**
 * http://localhost:3002/order/ [GET]
 */
router.get(
    '/',
    getOrdersController
);

router.put(
    '/:id',
    [
        check('booking')
            .optional()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        check('totalAmount')
            .optional()
            .isNumeric().withMessage(MessageErrorsEnum.TheKindOfDataNotIsValid),
        fieldsValidators
    ],
    updateOrderByIdController
)

router.delete(
    '/:id',
    [
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    deleteOrderByIdController
)

export { router }