import { Router} from "express";
import {getItems} from "../controllers/order";
import {checkJWT} from "../middleware/session";

/**
 * Esta ruta solo puede acceder las personas que tienen session activa!
 * que tengan un JWT valido!
 */
const router =  Router();

router.get('/', checkJWT, getItems)

export { router }