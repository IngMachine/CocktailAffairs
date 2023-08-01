import {compareSync, hash} from "bcryptjs";

const encrypt = async (password: string) => {
    return await hash(password, 8);
}

const verified = async(password: string, passwordHash: string) => {
    return compareSync(password, passwordHash);
}

export {
    encrypt,
    verified
}