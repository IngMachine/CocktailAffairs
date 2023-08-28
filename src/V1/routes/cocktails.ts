import {Router} from "express";
import {param} from "express-validator";

import {
    createCocktailController,
    deleteCocktailController,
    getCocktailByIdController,
    getCocktailsController,
    updateCocktailController,
} from "../../controllers/cocktails";
import {checkJWT, checkRolPermit} from "../../middleware/session";
import {fieldsValidators} from "../../middleware/fields-validators";

import {RoleEnum} from "../../constant/role";
import {validateCocktail} from "../../utils/validate-cocktail";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();


/**
 * @openapi
 * /api/cocktails:
 *     get:
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail
 *         summary: Get a list of all cocktails available
 *         description: This API endpoint allows anyone to retrieve a list of cocktails,
 *                      providing a captivating glimpse into the world of delightful beverages.
 *                      Users do not require authentication to access this public information,
 *                      making it a welcoming and open experience for all.
 *         responses:
 *             '200':
 *                 description: View the list of cocktails available of our applications
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Cocktails'
 *                         examples:
 *                             Cocktail:
 *                                 $ref: '#/components/examples/List Cocktails'
 */
router.get(
    '/',
    getCocktailsController
);

/**
 * @openapi
 * /api/cocktails/{id}:
 *     get:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the cocktail to view
 *           required: true
 *           type: string
 *           format: mongo-id
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail
 *         summary: Get a cocktail with the id
 *         description: This API endpoint allows anyone to retrieve detailed information about a specific
 *                      cocktail based on its unique ID. Users, regardless of their role, can access this
 *                      public information to learn more about individual cocktails and their ingredients.<br/>
 *                      Access Control:<br/>
 *                      Public access; no authentication is required.
 *         responses:
 *             '200':
 *                 description: View the cocktail for id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Cocktail'
 *                         examples:
 *                             Cocktail:
 *                                 $ref: '#/components/examples/Cocktail'
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
    getCocktailByIdController
);

router.use([checkJWT, checkRolPermit([ RoleEnum.Admin, RoleEnum.Bartender ])]);

/**
 * @openapi
 * /api/cocktails:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail
 *         summary: Create a new cocktail.
 *         description: This API endpoint enables users with admin and bartender roles to craft and submit
 *                      new cocktail creations. Individuals with these specific roles are granted the privilege
 *                      to contribute to the collection of enticing cocktails.
 *                      Other users without these roles are restricted from using this endpoint.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin and bartender roles can create cocktails using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Cocktail Created'
 *                     examples:
 *                         CocktailCreated:
 *                             $ref: '#/components/examples/Cocktail Created'
 *         responses:
 *             '201':
 *                 description: Create a new cocktail
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Cocktail'
 *                         examples:
 *                             Cocktail:
 *                                 $ref: '#/components/examples/Cocktail'
 *             '400':
 *                 description: Errors occurred creating a new image
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsFieldsCocktail:
 *                                 $ref: '#/components/examples/Errors Fields Cocktails'
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
 *                 description: Not authorized for created a cocktail
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
        ...validateCocktail,
        fieldsValidators
    ],
    createCocktailController
);


/**
 * @openapi
 * /api/cocktails/{id}:
 *     put:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the cocktail to view
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail
 *         summary: Update cocktail with id
 *         description: This API endpoint grants users with admin and bartender roles the authority to refine and update
 *                      existing cocktail information. With this capability, authorized users can enhance the details
 *                      of cocktails to ensure accuracy and offer an improved experience to the audience.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin and bartender roles can update cocktails using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Cocktail Created'
 *                     examples:
 *                         CocktailUpdated:
 *                             $ref: '#/components/examples/Cocktail Update'
 *         responses:
 *             '200':
 *                 description: Cocktail with id updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Cocktail'
 *                         examples:
 *                             Cocktail:
 *                                 $ref: '#/components/examples/Cocktail Update'
 *             '400':
 *                 description: Errors occurred creating a new image
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorsFieldsCocktail:
 *                                 $ref: '#/components/examples/Errors Fields Cocktails'
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
 *                 description: Not authorized for created a cocktail
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
        ...validateCocktail,
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    updateCocktailController
);

router.use([ checkRolPermit([RoleEnum.Admin])]);

/**
 * @openapi
 * /api/cocktails/{id}:
 *     delete:
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the cocktail to view
 *           required: true
 *           type: string
 *           format: mongo-id
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail
 *         summary: Delete cocktail with id
 *         description: This API endpoint provides administrators with the capability to remove cocktails
 *                      from the collection, ensuring a curated and accurate selection of beverages.
 *                      Exclusive access is granted to users with the admin role to maintain the integrity
 *                      of the cocktail offerings.<br/>
 *                      Access Control:<br/>
 *                      Only users with the admin role can delete cocktails using this endpoint.
 *         requestBody:
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Cocktail Created'
 *                     examples:
 *                         CocktailUpdated:
 *                             $ref: '#/components/examples/Cocktail Update'
 *         responses:
 *             '200':
 *                 description: Cocktail with id updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Cocktail'
 *                         examples:
 *                             Cocktail:
 *                                 $ref: '#/components/examples/Cocktail Delete'
 *             '400':
 *                 description: Errors occurred creating a new image
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
 *                 description: Errors occurred deleting cocktail for id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Errors Cocktail No Exist'
 *             '409':
 *                 description: Not authorized for created a cocktail
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
        param('id', 'The id is required')
            .not()
            .notEmpty()
            .isMongoId().withMessage('The id not is valid'),
        fieldsValidators
    ],
    deleteCocktailController
);

export { router }