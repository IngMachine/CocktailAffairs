import CocktailModel from "../models/cocktail";
import {Cocktail} from "../interfaces/cocktails.interface";

const getCocktailsService = async() => {
    try {
        return await CocktailModel
            .find()
            .populate('user', '-_id -password -createdAt -updatedAt')
            .populate('imageCocktail', '-_id name url');
    } catch (err) {
        throw err;
    }

}

const getCocktailService = async(id: string) => {
    try {
        return await CocktailModel
            .findById(id)
            .populate('user', '-_id -password -createdAt -updatedAt')
            .populate('imageCocktail', '-_id name url');
    } catch (err) {
        throw err;
    }
}
const createCocktailService = async ( cocktail: Cocktail) => {
    return await CocktailModel.create(cocktail);
}

const updateCocktailService = async (id: string, cocktail: Cocktail) => {
    try {
        return await CocktailModel.findByIdAndUpdate(
            id,
            cocktail,
            {
                new: true
            }
        );
    } catch (err) {
        throw err;
    }
}

const deleteCocktailService = async (id: string) => {
    try {
        return await CocktailModel.findByIdAndDelete(id);
    } catch (err) {
        throw err;
    }
}

export {
    getCocktailsService,
    getCocktailService,
    createCocktailService,
    updateCocktailService,
    deleteCocktailService,
}