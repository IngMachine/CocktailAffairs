import {Request, Response} from "express";
import * as Joi from "joi";

import {handleHttp} from "../utils/error.handle";

import {
    getImagesCocktailsService,
    insertImageCocktailService,
    updateImageCocktailService,
    deleteImageCocktailService
} from "../services/image-cocktails";

import {capitalizeWords} from "../utils/words";
import {MessageErrorsEnum} from "../constant/messageOfErrors";
import mongoose from "mongoose";

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
        const schema = Joi.object({
            name: Joi.string().min(5).required()
        });
        const data = await schema.validate(body);
        if (data.error) {
            return res.status(400).json({
                ok: false,
                errors: data.error
            });
        }
        if(files?.image) {
            body.name = capitalizeWords(body.name);
            const responseImage = await insertImageCocktailService( files , body );
            if (responseImage.ok){
                return res.status(201).json(responseImage);
            } else {
                return res.status(400).json({responseImage});
            }
        } else {
            return res.status(400).json({
                ok: false,
                msg: MessageErrorsEnum.NoImageAdd
            })
        }
    } catch (err) {
        handleHttp(res, 'ERROR_CREATE_IMAGE', err)
    }
}

const updateImageCocktailController = async ({body, files, params}: Request, res: Response) => {
    try {
        const { id } = params;

        const schema = Joi.object({
            name: Joi.string().min(5).required()
        });

        if(files?.image && body.name) {
            const data = await schema.validate(body);
            if (data.error) {
                return res.status(400).json({
                    ok: false,
                    errors: data.error
                });
            }
            const responseImage = await updateImageCocktailService( body, id, files );
            if(responseImage.ok) {
                return res.status(200).json(responseImage)
            } else {
                return res.status(400).json(responseImage);
            }
        }
        else if(files?.image){
            const responseImage = await updateImageCocktailService( body, id, files );
            if(responseImage.ok) {
                return res.status(200).json(responseImage)
            } else {
                return res.status(400).json(responseImage);
            }
        }
        if(body.name){
            const data = await schema.validate(body);
            if (data.error) {
                return res.status(400).json({
                    ok: false,
                    errors: data.error
                });
            }
            const responseImage = await updateImageCocktailService( body, id );
            if(responseImage.ok) {
                return res.status(200).json(responseImage)
            } else {
                return res.status(400).json(responseImage);
            }
        }
        else {
            return res.status(400).json({
                ok: false,
                msg: MessageErrorsEnum.NoImageOrNameForUpdate
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