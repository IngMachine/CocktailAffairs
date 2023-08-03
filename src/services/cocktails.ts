import {Cocktail} from "../interfaces/cocktails.interface";
import CocktailModel from "../models/cocktail";
import {ImageCocktail} from "../interfaces/imageCocktail.interface";
import ImageCocktailModel from "../models/imageCocktail";
import {deleteImageCloudinary, uploadImageCloudinary} from "../config/cloudinary";
import fs from 'fs-extra'

const getCocktails = async() => {
    return await CocktailModel
                        .find()
                        .populate('user', '-_id -password -createdAt -updatedAt')
                        .populate('imageCocktail', '-_id name url');
}

const getCocktail = async(id: string) => {
    return await CocktailModel
                            .findById(id)
                            .populate('user', '-_id -password -createdAt -updatedAt')
                            .populate('imageCocktail', '-_id name url');
}
const insertCocktail = async ( cocktail: Cocktail) => {
    return await CocktailModel.create(cocktail);
}

const updateCocktail = async (id: string, cocktail: Cocktail) => {
    const responseItem = await CocktailModel.findByIdAndUpdate(
        id,
        cocktail,
        {
            new: true
        }
    );
    return responseItem;
}

const deleteCocktail = async (id: string) => {
    return await CocktailModel.findByIdAndDelete(id);
}

const getImage = async () => {
    return await ImageCocktailModel.find({});
}

const insertImage = async ( files: any, imageCocktail: ImageCocktail ) => {
    try {
        let image = await ImageCocktailModel.findOne({ name: imageCocktail.name });
        if ( image ) {
            return {
                ok: false,
                msg: 'A image exists with this name'
            }
        }
        const result = await uploadImageCloudinary(files.image.tempFilePath);
        await fs.unlink(files.image.tempFilePath)
        return {
            ok: true,
            msg: await ImageCocktailModel.create({
                ...imageCocktail,
                ...result
            })
        };
    } catch (err) {
        throw err;
    }
}

const updateImageCocktail = async (files: any, imageCocktail: ImageCocktail, id: string ) => {
    try {
        let image = await ImageCocktailModel.findById(id);
        if (!image) {
            return {
                ok: false,
                msg: 'A image no exists with this id'
            }
        }
        await deleteImageCloudinary(image.public_id);
        const result = await uploadImageCloudinary(files.image.tempFilePath);
        await fs.unlink(files.image.tempFilePath)
        return {
            ok: true,
            msg: await ImageCocktailModel.findByIdAndUpdate(
                id,
                {
                    ...imageCocktail,
                    ...result
                },
                {
                    new: true
                }
            )
        };
    } catch (err) {
        throw err;
    }
}

const deleteImageCocktail = async (id: string) => {
    try {
        let image = await ImageCocktailModel.findById(id);
        if (!image) {
            return {
                ok: false,
                msg: 'A image no exists with this id'
            }
        }
        await deleteImageCloudinary(image.public_id);
        return await ImageCocktailModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    // Cocktail
    getCocktails,
    getCocktail,
    insertCocktail,
    updateCocktail,
    deleteCocktail,

    // Image
    getImage,
    insertImage,
    updateImageCocktail,
    deleteImageCocktail
}