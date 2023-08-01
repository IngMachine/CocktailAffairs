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

const UserModel = model('user', UserSchema);
export default UserModel;