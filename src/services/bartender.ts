import fs from "fs-extra";

import BartenderModel from "../models/bartender";
import {Bartender} from "../interfaces/bartender.interface";
import {RoleEnum} from "../constant/role";

import {
    deleteImageCloudinary,
    uploadImageCloudinary
} from "../config/cloudinary";
import {
    FolderImage,
    LinkImage
} from "../constant/folderImage";

import {
    getUserService,
    updateRoleUserByIdService
} from "./user";

import {addUnderScope} from "../utils/words";
import {MessageErrorsEnum} from "../constant/messageOfErrors";


const getBartendersService = async () => {
    try {
        return await BartenderModel.find({})
            .populate('user', 'name email description')
    } catch (err) {
        throw err;
    }

}

const getBartenderByIdUserService = async (idUser: string) => {
    try {
        return await BartenderModel.findOne({ user: idUser })
            .select('_id');
    } catch (err) {
        throw err;
    }
}

const createBartenderService = async ( bartender: Bartender, files: any ) => {
    try {
        const bartenderDB = await BartenderModel.findOne({ user: bartender.user });
        const user = await getUserService(bartender.user as string);
        if( !bartenderDB && user ) {

            await updateRoleUserByIdService(bartender.user as string, RoleEnum.Bartender);
            let result: any;
            if( files?.image ) {
                result = await uploadImageCloudinary(
                    files.image.tempFilePath,
                    FolderImage.Bartenders,
                addUnderScope(`${user!.name}-${bartender.age}`)
                );
                await fs.unlink(files.image.tempFilePath)
            } else {
                result = {
                    secure_url: LinkImage.NoPhoto,
                    public_id: 'no_image'
                }
            }

            const newBartender = {
                ...bartender,
                ...result,
                imageUrl: result.secure_url
            };

            return await BartenderModel.create(newBartender);

        } else {
            return {
                ok: false,
                msg: 'The bartender has been created with that user'
            }
        }
    } catch (err) {
        throw err;
    }
}

const updateBartenderService = async (bartender: Bartender, files: any, id: string) => {

    try {
        let result: any;
        const user = await getUserService(bartender.user as string);
        const bartenderDB = await BartenderModel.findById(id);

        if (user) {
            if( files?.image ) {
                result = await uploadImageCloudinary(
                    files.image.tempFilePath,
                    FolderImage.Bartenders,
                    addUnderScope(`${user!.name}-${bartender.age}`)
                );
                await deleteImageCloudinary(bartenderDB!.public_id)
                await fs.unlink(files.image.tempFilePath)
            } else if ( bartender.imageUrl ) {
                result = {
                    secure_url: bartender.imageUrl,
                    public_id: bartender.public_id
                }
            } else {
                result = {
                    secure_url: LinkImage.NoPhoto,
                    public_id: FolderImage.NoImage
                }
            }

            const newBartender: Bartender = {
                ...bartenderDB!.toObject(),
                ...bartender,
                ...result,
                imageUrl: result.secure_url
            };

            return {
                ok: true,
                msg: await BartenderModel.findByIdAndUpdate(
                    id,
                    newBartender,
                    {
                        new: true,
                    }
                )
            }
        } else {
            return {
                ok: false,
                msg: MessageErrorsEnum.UserNotFound
            }
        }

    } catch (err) {
        throw err;
    }

}

const deleteBartenderByIdService = async (id: string) => {
    try {
        return await BartenderModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getBartendersService,
    getBartenderByIdUserService,
    createBartenderService,
    updateBartenderService,
    deleteBartenderByIdService
}