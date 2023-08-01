import {sign, verify} from 'jsonwebtoken';

const JWT_SECRET = <string>process.env.JWT_SECRET
const generateToken = async (id: string) => {
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