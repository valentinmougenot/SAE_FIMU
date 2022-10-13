import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {default as routerArtiste} from './router/artiste.router.js';
import {default as routerScene} from './router/scene.router.js';
import {default as routerConcert} from './router/concert.router.js';
import {default as routerNotification} from './router/notification.router.js';

const app = express();

dotenv.config();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/artiste', routerArtiste);
app.use('/scene', routerScene);
app.use('/concert', routerConcert);
app.use('/notification', routerNotification);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})