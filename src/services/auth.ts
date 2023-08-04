import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";
import {encrypt, verified} from "../utils/bcrypt.handle";
import {Auth} from "../interfaces/auth.interface";
import {generateToken} from "../utils/jwt.handle";

const createUser = async ({ email, password, name, description, role }: User) => {
    const checkIs = await UserModel.findOne( { email });
    const passwordHash = await encrypt(password);
    if( checkIs ) return "ALREADY_USER";

    try {
        const user = await UserModel.create({email, password: passwordHash, name, description, role});
        const token = await generateToken(user);

        return {
            token,
            user
        };
    } catch (err) {
        throw err;
    }

}

const loginUser = async( { email, password}: Auth) => {
    const checkIs = await UserModel.findOne( { email });
    if( !checkIs ) return "NOT_FOUND_USER";

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if( !isCorrect ) return "PASSWORD_INCORRECT";

    const token = await generateToken(checkIs)

    return {
        token,
        user: checkIs
    };

}

export {
    createUser,
    loginUser
}