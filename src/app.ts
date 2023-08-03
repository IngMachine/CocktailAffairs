import express from 'express';
import fileUpload from 'express-fileupload'
import cors from 'cors';

import 'dotenv/config'
import db from './config/mongo'

import {router} from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './src/uploads'
}));
app.use(router)
db().then( () => console.log('Connection established'));


app.listen(PORT, () => console.log(`listening on port ${PORT}`))