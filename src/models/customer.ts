import { Schema, model } from 'mongoose'
import {Customer} from "../interfaces/customer.interface";
import UserModel from "./user";


const CustomerSchema = new Schema<Customer>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        shippingAddress: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

CustomerSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const CustomerModel = model('customer', CustomerSchema);

export default CustomerModel;