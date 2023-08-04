import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const uploadImageCloudinary = async(filePath: string, folder: string, public_id?: string) => {
    return await cloudinary.uploader.upload(filePath, {
        folder,
        public_id
    });
}

export const deleteImageCloudinary = async(publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
}