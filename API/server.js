import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {default as routerArtiste} from './routes/artiste.router.js';
import {db} from './models/index.js';
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import {default as routerScene} from './routes/scene.router.js';
import {default as routerNotification} from './routes/notification.router.js';
import {default as routerSaison} from './routes/saison.router.js';
import {default as routerCategorie} from './routes/categorie.router.js';
import {default as routerGenre} from './routes/genre.router.js';
import {default as routerConcert} from './routes/concert.router.js';
import {default as routerPays} from './routes/pays.router.js';
import {default as routerTypescene} from './routes/typescene.router.js';


const app = express();

dotenv.config();

const port = process.env.PORT;

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)

db.sequelize.sync()
    .then(() => {
        console.log('Synced db');
    })
    .catch(err => {
        console.log("Failed to sync db: ", err.message);
    });

app.use(bodyParser.json());
app.use(express.static(join(__dirname, 'public')))

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "FIMU API",
            description: "API documentation",
            contact: {
                name: "Valentin Mougenot",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["server.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname + '/view/home.html'))
})


app.use('/artiste', routerArtiste);
app.use('/scene', routerScene);
app.use('/notification', routerNotification);
app.use('/saison', routerSaison);
app.use('/categorie', routerCategorie);
app.use('/genre', routerGenre);
app.use('/concert', routerConcert);
app.use('/pays', routerPays);
app.use('/typescene', routerTypescene);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})