import {model, Schema} from "mongoose";

import {Order} from "../interfaces/order.interface";
import StatusModel from "./status";
import {StatusEnum} from "../constant/status";

const OrderSchema = new Schema<Order>(
    {
        booking: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        customer: {
            type: Schema.Types.ObjectId,
            required: true
        },
        totalAmount: {
            type: Number
        },
        status: {
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false,
        id: true
    }
);

OrderSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


OrderSchema.pre('save', async function (next) {
    if (this.isNew && !this.status) {
        // @ts-ignore
        this.status = await StatusModel.findOne({ name: StatusEnum.PENDING });
    }
    next();
});


const OrderModel = model('order', OrderSchema);
export default OrderModel;