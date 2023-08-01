import ItemModel from '../models/item';
import {Car} from "../interfaces/car.interface";

const getCar = async (id: string) => {
    return await ItemModel.findOne({ _id: id})
}

const getCars = async () => {
    return await ItemModel.find({});
}

const insertCar = async(item: Car) => {
    return await ItemModel.create(item);
}

const updateCar = async (id: string, data: Car) => {
    const responseItem = await ItemModel.findOneAndUpdate(
        { _id: id },
        data,
        {
            new: true
        }
    );
    return responseItem;
}

const deleteCar = async (id: string) => {
    const responseItem = await ItemModel.findByIdAndDelete(
        { _id: id }
    );
    return responseItem;
}
export {
    getCar,
    getCars,
    insertCar,
    updateCar,
    deleteCar
}