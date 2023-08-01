import {Request, Response} from "express";
import {handleHttp} from "../utils/error.handle";
import {deleteCar, getCar, getCars, insertCar, updateCar} from "../services/items";

const getItemById = async ({params}: Request, res: Response) => {
    try {
        const {id} = params;
        const response = await getCar(id);
        res.json(response)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_ITEM_BY_ID');
    }
}

const getItems = async (req: Request, res: Response) => {
    try {
        const responseCar = await getCars();
        res.json(responseCar)
    } catch ( err ) {
        handleHttp(res, 'ERROR_GET_ITEMS');
    }
}

const createItem = async({ body }: Request, res: Response) => {
    try {
        const responseCar = await insertCar(body);
        res.json(responseCar);
    } catch ( err ) {
        handleHttp(res, 'ERROR_CREATE_ITEM', err );
    }
}

const updateItem = async ({params, body}: Request, res: Response) => {

    try {
        const { id } = params;
        const responseCar = await updateCar( id, body );
        res.json(responseCar)
    } catch ( err ) {
        handleHttp(res, 'ERROR_UPDATE_ITEM');
    }
}

const deleteItem = async ({params}: Request, res: Response) => {
    try {
        const { id } = params;
        const responseCar = await deleteCar( id );
        res.json(responseCar)
    } catch ( err ) {
        handleHttp(res, 'ERROR_DELETE_ITEM');
    }
}

export {
    getItemById,
    getItems,
    createItem,
    updateItem,
    deleteItem
}