import {Request, Response} from "express";
import {handleHttp} from "../utils/error.handle";

import {
    getImagesCocktailsService,
    insertImageCocktailService,
    updateImageCocktailService,
    deleteImageCocktailService
} from "../services/image-cocktails";
import {capitalizeWords} from "../utils/words";

const getImagesCocktailsController = async (req: Request, res: Response) => {
    try {
        const responseGetImage = await getImagesCocktailsService();
        res.json(responseGetImage)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_IMAGES');
    }
}

const uploadImageCocktailController = async ({body, files}: Request, res: Response) => {
    try {
        // @ts-ignore
        if(files?.image) {
            body.name = capitalizeWords(body.name);
            const responseImage = await insertImageCocktailService( files , body );
            if (responseImage.ok){
                return res.status(201).json(responseImage);
            } else {
                return res.status(400).json(responseImage);
            }
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No image added'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_IMAGE', err)
    }
}

const updateImageCocktailController = async ({body, files, params}: Request, res: Response) => {
    try {
        const { id } = params;
        if(files?.image) {
            body.name = capitalizeWords(body.name);
            const responseImage = await updateImageCocktailService( files , body, id );
            res.status(201).json(responseImage)
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No image added to update'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_IMAGE_COCKTAIL', err)
    }
}

const deleteImageCocktailController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseCocktail = await deleteImageCocktailService(id);
        if ( !responseCocktail.ok ) {
            return res.status(404).json(responseCocktail)
        } else {
            return res.json(responseCocktail);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_IMAGE_COCKTAIL', err)
    }
}

export {
    getImagesCocktailsController,
    uploadImageCocktailController,
    updateImageCocktailController,
    deleteImageCocktailController
}