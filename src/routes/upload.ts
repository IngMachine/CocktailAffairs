import { Router} from "express";
import multerMiddleware from "../middleware/file";
import {getFile} from "../controllers/uplodad";
import {checkJWT} from "../middleware/session";

const router =  Router();

router.post('/', checkJWT, multerMiddleware.single("myfile"), getFile);

export { router }