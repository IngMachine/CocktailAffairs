import ImageCocktailModel from "../models/imageCocktail";
import {ImageCocktail} from "../interfaces/imageCocktail.interface";
import {deleteImageCloudinary, uploadImageCloudinary} from "../config/cloudinary";
import {FolderImage} from "../constant/folderImage";
import fs from "fs-extra";
import {addUnderScope} from "../utils/words";

const getImagesCocktailsService = async () => {
    try {
        return await ImageCocktailModel.find({});
    } catch (err) {
        throw err;
    }
}

const insertImageCocktailService = async ( files: any, imageCocktail: ImageCocktail ) => {
    try {
        let image = await ImageCocktailModel.findOne({ name: imageCocktail.name });
        if ( image ) {
            return {
                ok: false,
                msg: 'A image exists with this name'
            }
        }
        const result = await uploadImageCloudinary(
            files.image.tempFilePath,
            FolderImage.Cocktails,
            addUnderScope(imageCocktail.name)
        );
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

const   updateImageCocktailService = async (files: any, imageCocktail: ImageCocktail, id: string ) => {
    try {
        let image = await ImageCocktailModel.findById(id);
        if (!image) {
            return {
                ok: false,
                msg: 'A image no exists with this id'
            }
        }

        await deleteImageCloudinary(image.public_id);

        const result = await uploadImageCloudinary(
            files.image.tempFilePath,
            FolderImage.Cocktails,
            addUnderScope(imageCocktail.name)
        );

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

const deleteImageCocktailService = async (id: string) => {
    try {
        let image = await ImageCocktailModel.findById(id);
        if (!image) {
            return {
                ok: false,
                msg: 'A image no exists with this id'
            }
        }
        await deleteImageCloudinary(image.public_id);
        return {
            ok: true,
            msg: await ImageCocktailModel.findByIdAndDelete(id)
        };
    } catch (err) {
        throw err;
    }
}


export {
    getImagesCocktailsService,
    insertImageCocktailService,
    updateImageCocktailService,
    deleteImageCocktailService
}