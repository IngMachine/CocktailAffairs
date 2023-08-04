import BartenderModel from "../models/bartender";
import {Bartender} from "../interfaces/bartender.interface";
import {uploadImageCloudinary} from "../config/cloudinary";
import {FolderImage, LinkImage} from "../constant/folderImage";
import fs from "fs-extra";
import {getUserService, updateRoleUserByIdService} from "./user";
import {RoleEnum} from "../constant/role";


const getBartendersService = async () => {
    return await BartenderModel.find({})
        .populate('user', 'name email description')
}

const createBartenderService = async (files: any, bartender: Bartender) => {
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
                `${user!.name}-${bartender.age}`
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

            console.log(newBartender)

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

export {
    getBartendersService,
    createBartenderService
}