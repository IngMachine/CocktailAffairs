import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerV1Setup from './docs/swaggerV1'

import 'dotenv/config'
import db from './config/mongo'

import {router} from "./V1/routes";

const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerV1Setup));
db().then( () => console.log('Connection established'));


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})