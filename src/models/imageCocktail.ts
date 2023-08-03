import { Schema, model } from 'mongoose';
import {ImageCocktail} from "../interfaces/imageCocktail.interface";

const ImageCocktailSchema = new Schema<ImageCocktail>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        secure_url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

ImageCocktailSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const ImageCocktailModel = model('imageCocktail', ImageCocktailSchema);

export default ImageCocktailModel;