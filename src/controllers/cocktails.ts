import {Request, Response} from "express";

import {
    deleteCocktail,
    getCocktail,
    getCocktails,
    getImage,
    insertCocktail,
    insertImage, updateCocktail
} from "../services/cocktails";

import {handleHttp} from "../utils/error.handle";
import {RequestExtends} from "../interfaces/req-ext.interface";

const getCocktailsController = async (req: Request, res: Response) => {
    try {
        const responseCocktails = await getCocktails();
        res.json(responseCocktails)
    } catch ( err ) {
        console.log(err)
        handleHttp(res, 'ERROR_GET_ITEMS');
    }
}

const getCocktailsById = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await getCocktail(id);
        res.json(response)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_ITEM_BY_ID');
    }
}

const createCocktail = async ({body, user}: RequestExtends, res: Response) => {
    try {
        const newCocktail = {
            ...body,
            user: user.id
        }
        const responseCocktail = await insertCocktail(newCocktail);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_COCKTAIL', err)
    }
}

const updateCocktailController = async ({ params, body, user }: RequestExtends, res: Response) => {
    try {
        const { id } = params;
        const updateCocktailObject = {
            ...body,
            user: user.id
        }
        const responseCocktail = await updateCocktail(id, updateCocktailObject);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_COCKTAIL', err)
    }
}


const deleteCocktailController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseCocktail = await deleteCocktail(id);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_COCKTAIL', err)
    }
}


const getImageController = async (req: Request, res: Response) => {
    try {
        const responseGetImage = await getImage();
        res.json(responseGetImage)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_IMAGES');
    }
}

const uploadImage = async ({body}: Request, res: Response) => {

    try {
        // TODO: cloudnary subirlo y que me genere la url
        const responseImage = await insertImage(body);
        if( responseImage.ok ){
            res.status(201).json(responseImage)
        } else {
            res.status(400).json(responseImage);
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_IMAGE', err)
    }
}

export {
    // Cocktail
    getCocktailsController,
    getCocktailsById,
    createCocktail,
    updateCocktailController,
    deleteCocktailController,

    // Image
    getImageController,
    uploadImage
}