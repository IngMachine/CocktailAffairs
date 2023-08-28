import ImageCocktailModel from "../models/imageCocktail";
import axios from 'axios'
import {ImageCocktail} from "../interfaces/imageCocktail.interface";
import {deleteImageCloudinary, uploadImageCloudinary} from "../config/cloudinary";
import {FolderImage} from "../constant/folderImage";
import fs from "fs-extra";
import {addUnderScope, capitalizeWords} from "../utils/words";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

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
            await fs.unlink(files.image.tempFilePath)
            return {
                ok: false,
                msg: MessageErrorsEnum.AImageExistWithSameName
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
        await fs.unlink(files.image.tempFilePath)
        console.log('deleted image temporal');
        throw err;
    }
}

const   updateImageCocktailService = async (imageCocktail: ImageCocktail, id: string, files?: any) => {
    try {
        let image = await ImageCocktailModel.findById(id);
        if (!image) {
            return {
                ok: false,
                msg: MessageErrorsEnum.ImageNotExistWithThatId
            }
        }



        if(files && imageCocktail.name){
            imageCocktail = {
                ...imageCocktail,
                name: capitalizeWords(imageCocktail.name)
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
        }
        else if(files && !imageCocktail.name) {
            await deleteImageCloudinary(image.public_id);
            const result = await uploadImageCloudinary(
                files.image.tempFilePath,
                FolderImage.Cocktails,
                addUnderScope(image.name)
            );

            await fs.unlink(files.image.tempFilePath)
            return {
                ok: true,
                msg: await ImageCocktailModel.findByIdAndUpdate(
                    id,
                    {
                        ...image,
                        ...result
                    },
                    {
                        new: true
                    }
                )
            };
        }
        else if(!files && imageCocktail.name) {
            imageCocktail = {
                ...imageCocktail,
                name: capitalizeWords(imageCocktail.name)
            }
            const response = await axios.get(image.secure_url, { responseType: 'arraybuffer' });
            const imageData = Buffer.from(response.data, 'binary');

            const localPath: string = './src/uploads/image.png';
            fs.writeFileSync(localPath, imageData);

            await deleteImageCloudinary(image.public_id);

            const result = await uploadImageCloudinary(
                localPath,
                FolderImage.Cocktails,
                addUnderScope(imageCocktail.name)
            );

            fs.unlinkSync(localPath);

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
        }
        else {
            return {
                ok: false,
                msg: MessageErrorsEnum.NoImageOrNameForUpdate
            }
        }
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