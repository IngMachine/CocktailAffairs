import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";
import {encrypt, verified} from "../utils/bcrypt.handle";
import {Auth} from "../interfaces/auth.interface";
import {generateToken} from "../utils/jwt.handle";

const createUser = async ({ email, password, name, description }: User) => {
    const checkIs = await UserModel.findOne( { email });
    const passwordHash = await encrypt(password);
    if( checkIs ) return "ALREADY_USER";

    const user = await UserModel.create({email, password: passwordHash, name, description});
    const token = await generateToken(user.id);

    return {
        token,
        user
    };
}

const loginUser = async( { email, password}: Auth) => {
    const checkIs = await UserModel.findOne( { email });
    if( !checkIs ) return "NOT_FOUND_USER";

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if( !isCorrect ) return "PASSWORD_INCORRECT";

    const token = await generateToken(checkIs.id)

    return {
        token,
        user: checkIs
    };

}

export {
    createUser,
    loginUser
}