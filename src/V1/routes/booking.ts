import {Router} from "express";
import {param} from "express-validator";

import {
    createBookingController,
    deleteBookingController,
    getBookingsController,
    updateBookingController
} from "../../controllers/booking";

import {checkJWT, checkRolPermit} from "../../middleware/session";
import {fieldsValidators} from "../../middleware/fields-validators";
import {validateBooking} from "../../utils/validate-booking";
import {RoleEnum} from "../../constant/role";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

router.use([
    checkJWT,
    checkRolPermit( [ RoleEnum.Admin, RoleEnum.Visitor ] )
])

/**
 * @openapi
 * /api/booking:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bookings
 *              - Admin
 *              - Visitors
 *         summary: Create a bookings (role visitor or admin)
 *         description: This API endpoint allows users with the roles of "visitor" or "admin" to create new bookings
 *                      for bartender services. Users can specify event details, select preferred bartenders,
 *                      and provide necessary information for a successful booking. Once created, only the user who
 *                      made the booking or users with "admin" privileges can modify it. This API ensures a controlled
 *                      and secure booking process while offering flexibility for authorized users.<br/>
 *                      Access Control:<br/>
 *                      Only users with "visitor" or "admin" roles can create bookings using this endpoint.<br/>
 *                      Users can only modify bookings they have created, or admin users can modify any booking.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         oneOf:
 *                             - $ref: '#/components/schemas/Booking Created Admin'
 *                             - $ref: '#/components/schemas/Booking Created Bartender'
 *                     examples:
 *                         admin:
 *                             $ref: '#/components/examples/Booking Created Admin'
 *                         bartender:
 *                             $ref: '#/components/examples/Booking Created Bartender'
 *         responses:
 *             '201':
 *                 description: Booking created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Booking'
 *                         examples:
 *                             Booking:
 *                                 $ref: '#/components/examples/Booking Created'
 *             '400':
 *                 description: Errors occurred creating a new booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Booking fields errors'
 *             '401':
 *                 description: Errors occurred creating a new booking for this user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/Error no authorized created booking'
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
        ...validateBooking,
        fieldsValidators
    ],
    createBookingController
);

/**
 * @openapi
 * /api/booking/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the booking to update
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bookings
 *              - Admin
 *              - Visitors
 *         summary: Update a bookings (role visitor or admin)
 *         description: This API endpoint allows administrators to update existing bookings for bartender services.
 *                      Admin users can modify event details, adjust bartender assignments, and make necessary changes
 *                      to ensure successful event coordination. This API empowers administrators to maintain accurate
 *                      and up-to-date booking information, enhancing the overall event planning process.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can update bookings using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         oneOf:
 *                             - $ref: '#/components/schemas/Booking Created Admin'
 *                             - $ref: '#/components/schemas/Booking Created Bartender'
 *                     examples:
 *                         admin:
 *                             $ref: '#/components/examples/Booking Created Admin'
 *                         bartender:
 *                             $ref: '#/components/examples/Booking Created Bartender'
 *         responses:
 *             '201':
 *                 description: Booking updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Booking'
 *                         examples:
 *                             Booking:
 *                                 $ref: '#/components/examples/Booking Created'
 *             '400':
 *                 description: Errors occurred creating a new booking
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsFieldBartender:
 *                                 $ref: '#/components/examples/Booking fields errors'
 *             '401':
 *                 description: Errors occurred creating a new booking for this user
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Error Response'
 *                         examples:
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/Error no authorized created booking'
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
 *                 description: No booking cannot find
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorNoBooking:
 *                                 $ref: '#/components/examples/Error not booking'
 *             '409':
 *                 description: Not authorized for updated booking
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
        ...validateBooking,
        param('id', MessageErrorsEnum.IdIsRequired)
            .not()
            .notEmpty()
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators
    ],
    updateBookingController
);

router.use( checkRolPermit([RoleEnum.Admin]) )

/**
 * @openapi
 * /api/booking:
 *     get:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bookings
 *              - Admin
 *         summary: Get all bookings
 *         description: This API endpoint allows administrators to retrieve a list of bookings for bartender services.
 *                      Admin users can access information about scheduled events, chosen bartenders, event details,
 *                      and more. This API provides administrators with the visibility and control necessary to
 *                      manage and oversee bookings for successful event coordination.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can access this endpoint.
 *         responses:
 *             '200':
 *                 description: List of all bookings
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Bookings'
 *                         examples:
 *                             Booking:
 *                                 $ref: '#/components/examples/List Bookings'
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
 *                 description: Not authorized for view the list of booking
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
    getBookingsController
);


/**
 * @openapi
 * /api/booking/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the booking to delete
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Book Bartender Services
 *              - Bookings
 *              - Admin
 *         summary: Delete booking for id
 *         description: This API endpoint allows administrators to delete bookings for bartender services.
 *                      Admin users can remove event details, cancel bartender assignments, and efficiently
 *                      manage the booking schedule. This API empowers administrators to maintain an organized
 *                      and up-to-date booking system, ensuring effective event coordination and management.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin roles can delete bookings using this endpoint.
 *         responses:
 *             '200':
 *                 description: Booking delete successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Booking'
 *                         examples:
 *                             Booking:
 *                                 $ref: '#/components/examples/Booking Created
 *             '400':
 *                 description: Errors occurred deleting a booking
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
 *                 description: No booking cannot find
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorNoBooking:
 *                                 $ref: '#/components/examples/Error not booking'
 *             '409':
 *                 description: Not authorized for delete this booking
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
    deleteBookingController
);


export { router }