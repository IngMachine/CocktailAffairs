import {Request, Response} from "express";

import {
    getCocktail,
    getCocktails,
    insertCocktail,
    updateCocktail,
    deleteCocktail,
    getImage,
    insertImage
} from "../services/cocktails";

import {handleHttp} from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";

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

const createCocktail = async ({body, user}: RequestExt, res: Response) => {
    try {
        const newCocktail = {
            ...body,
            user: user?.id
        }
        const responseCocktail = await insertCocktail(newCocktail);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_COCKTAIL', err)
    }
}

const updateCocktailController = async ({ params, body, user }: RequestExt, res: Response) => {
    try {
        const { id } = params;
        const updateCocktailObject = {
            ...body,
            user: user?.id
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

const uploadImage = async ({body, files}: Request, res: Response) => {
    try {
        // TODO: cloudnary subirlo y que me genere la url
        // @ts-ignore
        if(files?.image) {
            const responseImage = await insertImage(files,body);
            res.status(201).json(responseImage)
        } else {
            return res.status(400).json({
                ok: false,
                msg: 'No hay una imagen agregada'
            })
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