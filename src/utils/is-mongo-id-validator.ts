import mongoose from "mongoose";

export const isMongoIdOfArrayOptionalValidator = (values: string[]) => {
    if (!values || values.length === 0) {
        return true; // No roles provided, validation passes
    }

    // Check if each value is a valid MongoDB ObjectId
    for (const role of values) {
        if (!mongoose.Types.ObjectId.isValid(role)) {
            throw new Error('Invalid ObjectId');
        }
    }

    return true; // All roles are valid ObjectIds
}

export const isMongoIdOptionalValidator = (value: string) => {
    if (!value) {
        return true; // No roles provided, validation passes
    }


    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ObjectId');
    }

    return true; // All roles are valid ObjectIds
}

