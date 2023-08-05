import { Schema,  model } from 'mongoose';

import {User} from "../interfaces/user.interface";
import RoleModel from "./role";

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: 'Description for default'
        },
        role: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: RoleModel,
                    required: true
                }
            ],
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UserSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
UserSchema.pre('save', async function (next) {
    if (this.isNew && !this.role.length) {
        const defaultRole = await RoleModel.findOne({ name: 'VISITOR' });
        // @ts-ignore
        this.role.push(defaultRole?._id);
    }
    next();
});

const UserModel = model('user', UserSchema);
export default UserModel;