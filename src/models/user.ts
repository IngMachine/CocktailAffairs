import { Schema,  model } from 'mongoose';
import {User} from "../interfaces/user.interface";

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

const UserModel = model('user', UserSchema);
export default UserModel;