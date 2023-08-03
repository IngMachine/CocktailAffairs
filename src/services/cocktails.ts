import {Cocktail} from "../interfaces/cocktails.interface";
import CocktailModel from "../models/cocktail";
import {ImageCocktail} from "../interfaces/imageCocktail.interface";
import ImageCocktailModel from "../models/imageCocktail";

const getCocktails = async() => {
    return await CocktailModel
                        .find()
                        .populate('user', '-_id -password -createdAt -updatedAt')
                        .populate('imageCocktail', '-_id name url');
}

const getCocktail = async(id: string) => {
    return await CocktailModel.findById(id)
}
const insertCocktail = async ( cocktail: Cocktail) => {
    return await CocktailModel.create(cocktail);
}

const updateCocktail = async (id: string, cocktail: Cocktail) => {
    const responseItem = await CocktailModel.findByIdAndUpdate(
        id,
        cocktail,
        {
            new: true
        }
    );
    return responseItem;
}

const deleteCocktail = async (id: string) => {
    return await CocktailModel.findByIdAndDelete(id);
}

const insertImage = async ( imageCocktail: ImageCocktail ) => {
    try {
        let image = await ImageCocktailModel.findOne({ name: imageCocktail.name });
        if ( image ) {
            return {
                ok: false,
                msg: 'A image exists with this name'
            }
        }
        return {
            ok: true,
            msg: await ImageCocktailModel.create(imageCocktail)
        };
    } catch (err) {
        throw err;
    }
}

const getImage = async () => {
    return await ImageCocktailModel.find({});
}

export {
    // Cocktail
    getCocktails,
    getCocktail,
    insertCocktail,
    updateCocktail,
    deleteCocktail,

    // Image
    getImage,
    insertImage
}