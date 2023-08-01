import {Router} from "express";
import {createItem, deleteItem, getItemById, getItems, updateItem} from "../controllers/items";
import {logMiddleware} from "../middleware/log";

const router =  Router();



router.get('/', getItems);
router.get('/:id', logMiddleware, getItemById);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export { router }