import {sign, verify} from 'jsonwebtoken';
import {User} from "../interfaces/user.interface";

const JWT_SECRET = <string>process.env.JWT_SECRET
const generateToken = async ({id}: User) => {
    return sign({id}, JWT_SECRET, {
        expiresIn: '2h'
    });
}

const verifyToken = (jwt: string) => {
    return verify(jwt, JWT_SECRET);
}

export {
    generateToken,
    verifyToken
}