import mongoose from "mongoose";
import {MessageErrorsEnum} from "../constant/messageOfErrors";

export const isMongoIdOfArrayOptionalValidator = (values: string[]) => {
    if (!values || values.length === 0) {
        return true; // No roles provided, validation passes
    }

    // Check if each value is a valid MongoDB ObjectId
    for (const role of values) {
        if (!mongoose.Types.ObjectId.isValid(role)) {
            throw new Error(MessageErrorsEnum.InvalidObjectId);
        }
    }

    return true; // All roles are valid ObjectIds
}

export const isMongoIdOptionalValidator = (value: string) => {
    if (!value) {
        return true; // No roles provided, validation passes
    }


    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error(MessageErrorsEnum.InvalidObjectId);
    }

    return true; // All roles are valid ObjectIds
}

