import { Schema, Types, model, Models } from 'mongoose';
import {Car, SystemCombustion} from "../interfaces/car.interface";

const ItemSchema = new Schema<Car>(
    {
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        systemCombustion: {
            type: String,
            enum: SystemCombustion,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const ItemModel = model('items', ItemSchema);
export default ItemModel;