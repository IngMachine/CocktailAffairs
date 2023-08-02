import { Schema, model } from 'mongoose';
import {Cocktail, GlassType, Size} from "../interfaces/cocktails.interface";
import UserModel from "./user";
import ImageCocktailModel from "./imageCocktail";

const CocktailSchema = new Schema<Cocktail>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        size: {
            type: String,
            enum: Size,
            required: true
        },
        preparation: {
            type: String,
            required: true
        },
        glassType: {
            type: String,
            enum: GlassType,
            required: true
        },
        ingredients: [{
           type: String,
           required: true
        }],
        alcoholic: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        imageCocktail: {
            type: Schema.Types.ObjectId,
            ref: ImageCocktailModel,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
        id: true
    }
)

CocktailSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


const CocktailModel = model('cocktails', CocktailSchema);
export default CocktailModel;