import {ImageCocktail} from "./imageCocktail.interface";
import {User} from "./user.interface";

export interface Cocktail {
    name: string;
    description: string;
    size: Size;
    preparation: string;
    glassType: GlassType;
    ingredients: string[];
    alcoholic: boolean;
    price: number;
    imageCocktail: ImageCocktail;
    user: User
}

// TODO: Se deben tomar los valores de la base de datos de todos los enum.
export enum Size {
    small = "Small",
    medium = "Medium",
    large = "Large"
}

export enum GlassType {
    Martini = "Martini Glass",
    Margarita = "Margarita Glass",
    Wine = "Wine Glass",
    OldFashioned = "Old Fashioned Glass",
    Highball = "Highball Glass",
    Collins = "Collins Glass",
    Cocktail = "Cocktail Glass",
    Tiki = "Tiki Glass",
    Hurricane = "Hurricane Glass",
    Shot = "Shot Glass",
}