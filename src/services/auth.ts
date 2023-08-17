import UserModel from "../models/user";
import {User} from "../interfaces/user.interface";
import {encrypt, verified} from "../utils/bcrypt.handle";
import {Auth} from "../interfaces/auth.interface";
import {generateToken} from "../utils/jwt.handle";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

const createUserService = async ({ email, password, name, description, role }: User) => {
    const checkIs = await UserModel.findOne( { email });
    const passwordHash = await encrypt(password);
    if( checkIs ) return {
        ok: false,
        msg: MessageErrorsEnum.UserAlReadyExist
    };

    try {
        const user = await UserModel.create({email, password: passwordHash, name, description, role});
        const token = await generateToken(user);

        return {
            ok: true,
            token,
            user
        };
    } catch (err) {
        throw err;
    }

}

const loginUserService = async( { email, password}: Auth) => {
    const checkIs = await UserModel.findOne( { email });
    if( !checkIs ) return {
        ok: false,
        msg: MessageErrorsEnum.EmailOrPasswordIncorrect
    }

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if( !isCorrect ) return {
        ok: false,
        msg: MessageErrorsEnum.EmailOrPasswordIncorrect
    }

    const token = await generateToken(checkIs)

    return {
        ok: true,
        token,
        user: checkIs
    };

}

export {
    createUserService,
    loginUserService
}