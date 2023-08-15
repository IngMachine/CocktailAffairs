import {Request, Response} from "express";

import {
    getCocktailService,
    getCocktailsService,
    createCocktailService,
    updateCocktailService,
    deleteCocktailService,
} from "../services/cocktails";

import {handleHttp} from "../utils/error.handle";
import {RequestExt} from "../interfaces/req-ext.interface";

const getCocktailsController = async (req: Request, res: Response) => {
    try {
        const responseCocktails = await getCocktailsService();
        res.json(responseCocktails)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_COCKTAILS');
    }
}

const getCocktailByIdController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await getCocktailService(id);
        res.json(response)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_COCKTAIL_BY_ID');
    }
}

const createCocktailController = async ({body, user}: RequestExt, res: Response) => {
    try {
        const newCocktail = {
            ...body,
            user: user?.id
        }
        const responseCocktail = await createCocktailService(newCocktail);
        return res.status(201).json(responseCocktail);
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
        const responseCocktail = await updateCocktailService(id, updateCocktailObject);
        res.json(responseCocktail);
    } catch (err) {
        handleHttp(res, 'ERROR_UPDATE_COCKTAIL', err)
    }
}


const deleteCocktailController = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const responseCocktail = await deleteCocktailService(id);

        if( responseCocktail ) {
            return res.json(responseCocktail);
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'Cocktail not found'
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_DELETE_COCKTAIL', err)
    }
}

export {
    getCocktailsController,
    getCocktailByIdController,
    createCocktailController,
    updateCocktailController,
    deleteCocktailController,
}