import { Schema, model } from 'mongoose'
import {Role} from "../interfaces/role.interface";


const RoleSchema = new Schema<Role>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

RoleSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

const RoleModel = model('role', RoleSchema);

export default RoleModel;