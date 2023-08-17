import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerV1Setup from './docs/swaggerV1'

import 'dotenv/config'
import db from './config/mongo'

import {router} from "./V1/routes";
import {checkJWT, checkRolPermit} from "./middleware/session";
import {RoleEnum} from "./constant/role";

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
db().then( () => console.log('Connection established'));

// TODO: habilitar la pagina de la documentacion solo para usuario registrados y administrativos.
// app.use([checkJWT, checkRolPermit([RoleEnum.Admin])])
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerV1Setup));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})