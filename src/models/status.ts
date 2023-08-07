import { Schema, model } from 'mongoose'
import {Status} from "../interfaces/status.interfaces";


const StatusSchema = new Schema<Status>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

StatusSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const StatusModel = model('status', StatusSchema);

export default StatusModel;