// TODO Faltan validaciones en este archivo por las imagenes
import {Router} from "express";

import {checkJWT, checkRolPermit} from "../../middleware/session";

import fileUpload from "express-fileupload";

import {
    deleteImageCocktailController,
    getImagesCocktailsController,
    updateImageCocktailController,
    uploadImageCocktailController
} from "../../controllers/image-cocktails";
import {RoleEnum} from "../../constant/role";
import {fieldsValidators} from "../../middleware/fields-validators";
import {param} from "express-validator";
import {MessageErrorsEnum} from "../../constant/messageOfErrors";

const router =  Router();

/**
 * @openapi
 * /api/image-cocktails:
 *     get:
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail Image
 *         summary: Get a list of images of all cocktails
 *         description: This endpoint allows users to obtain all the images associated with the cocktails available
 *                      on the "CocktailAffairs" platform.
 *         responses:
 *             '200':
 *                 description: View the list of images of cocktails our application
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/List Image Cocktail'
 *                         examples:
 *                             Images-Cocktails:
 *                                 $ref: '#/components/examples/List Images Cocktails'
 */
router.get(
    '/',
    getImagesCocktailsController
)

router.use( [
    checkJWT,
    checkRolPermit([RoleEnum.Admin, RoleEnum.Bartender])
] );

/**
 * @openapi
 * /api/image-cocktails:
 *     post:
 *         security:
 *         - bearerAuth: []
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail Image
 *         summary: Create a new image the cocktail
 *         description: This API endpoint allows administrators and bartenders to upload and create new cocktail images.
 *                      Only users with the admin and bartender roles are authorized to use this endpoint.
 *                      The image name must be unique, and when created, the name is capitalized for each word.<br/>
 *                      Access Control:<br/>
 *                      Only users with admin and bartender roles can create images using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Image Cocktail'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '200':
 *                 description: Image created successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Image Cocktails Created'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/Image Cocktail Created Example'
 *             '400':
 *                 description: Errors occurred creating a new image
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field JOI'
 *                         examples:
 *                             errorsFields:
 *                                 $ref: '#/components/examples/Errors Fields Image Cocktail'
 *                             errorsFieldName:
 *                                 $ref: '#/components/examples/Errors Field Name'
 *                             errorImageSameName:
 *                                 $ref: '#/components/examples/Errors Image Same Name'
 *                             errorImageNoAdd:
 *                                 $ref: '#/components/examples/Errors Image No Add'
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
router.post(
    '/',
    [
        fileUpload({
            useTempFiles: true,
            tempFileDir: './src/uploads'
        })
    ],
    uploadImageCocktailController
)

/**
 * @openapi
 * /api/image-cocktails/{id}:
 *     put:
 *         security:
 *         - bearerAuth: []
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the image cocktail to update
 *           required: true
 *           type: string
 *           format: mongo-id
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail Image
 *         summary: Update image for id
 *         description: This API endpoint allows both administrators and bartenders to update the image associated
 *                      with a bartender's profile within the system<br/>
 *                      Access Control:<br/>
 *                      Administrators and bartenders have permission to update bartender images using this endpoint.
 *         requestBody:
 *             content:
 *                 multipart/form-data:
 *                     schema:
 *                         $ref: '#/components/schemas/Image Cocktail'
 *                 encoding:
 *                     image:
 *                         contentType: image/jpeg, image/png
 *         responses:
 *             '200':
 *                 description: Image updated successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Image Cocktails Created'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/Image Cocktail Created Example'
 *             '400':
 *                 description: Errors occurred creating a new image
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Errors Image No Exist'
 *                             errorNoImageOrName:
 *                                 $ref: '#/components/examples/Errors No image or name for update'
 *                             errorIdInvalid:
 *                                 $ref: '#/components/examples/errorInIdParam'
 *                             errorsFieldName:
 *                                 $ref: '#/components/examples/Errors Field Name Short'
 *
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
 *                 description: Not authorized for updated the image by id
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
    updateImageCocktailController
)

router.use( checkRolPermit([RoleEnum.Admin]) );

/**
 * @openapi
 * /api/image-cocktails/{id}:
 *     delete:
 *         security:
 *         - bearerAuth: []
 *         parameters:
 *         - name: id
 *           in: path
 *           description:  The id of the image cocktail to delete
 *           required: true
 *           type: string
 *           format: mongo-id
 *         tags:
 *           - Explore Cocktails
 *              - Cocktail Image
 *         summary: Delete image for id
 *         description: This API endpoint allows administrators to delete the image associated
 *                      with a cocktail within the system.<br/>
 *                      Access Control:<br/>
 *                      Only administrators can delete cocktail images using this endpoint.
 *         responses:
 *             '200':
 *                 description: Image delete successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Image Cocktails Created'
 *                         examples:
 *                             Roles:
 *                                 $ref: '#/components/examples/Image Cocktail Created Example'
 *             '400':
 *                 description: Errors occurred deleting image for id
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
 *                 description: Errors occurred deleting image for id
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: '#/components/schemas/Errors Field'
 *                         examples:
 *                             errorImageNotExistsWithThatId:
 *                                 $ref: '#/components/examples/Errors Image No Exist'
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
            .isMongoId().withMessage(MessageErrorsEnum.InvalidObjectId),
        fieldsValidators,
    ],
    deleteImageCocktailController
)

export { router }