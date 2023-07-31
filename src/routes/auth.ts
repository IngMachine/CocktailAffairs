import { Router} from "express";
import {loginController, registerController} from "../controllers/auth";

const router =  Router();

/**
 * http://localhost:3002/auth/register [POST]
 */
router.post('/register', registerController);

/**
 * http://localhost:3002/auth/login [POST]
 */
router.post('/login', loginController)

export { router }