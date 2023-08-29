import { Schema, model } from 'mongoose'
import {Bartender} from "../interfaces/bartender.interface";
import User from "./user";


const BartenderSchema = new Schema<Bartender>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: true
        },
        specialties: [
            {
                type: String,
                required: true,
            }
        ],
        professionalDescription: {
            type: String,
            required: true
        },
        isAvailable: {
            type: Boolean,
            default: true,
            required: true
        },
        imageUrl: {
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

BartenderSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const BartenderModel = model('bartender', BartenderSchema);

export default BartenderModel;