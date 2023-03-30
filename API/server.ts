import express from 'express';

import actualiteRouter from "./routes/actualite.router";
import artisteRouter from './routes/artiste.router';
import authRouter from './routes/auth.router';
import concertRouter from './routes/concert.router';
import categorieRouter from "./routes/categorie.router";
import genreRouter from "./routes/genre.router";
import notificationRouter from "./routes/notification.router";
import paysRouter from "./routes/pays.router";
import reseauxSociauxRouter from "./routes/reseauxSociaux.router";
import roleRouter from "./routes/role.router";
import saisonRouter from "./routes/saison.router";
import sceneRouter from "./routes/scene.router";
import serviceRouter from "./routes/service.router";
import standRouter from "./routes/stand.router";
import typeactuRouter from "./routes/typeactu.router";
import typesceneRouter from "./routes/typescene.router";
import typestandRouter from "./routes/typestand.router";
import utilisateurRouter from "./routes/utilisateur.router";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();
app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080'
    ],
    credentials: true
}));

import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mon API REST Express',
            version: '1.0.0',
            description: 'Documentation Swagger pour mon API REST Express'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur local'
            }
        ]
    },
    apis: ['./routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/actualite', actualiteRouter);
app.use('/artiste', artisteRouter);
app.use('/auth', authRouter);
app.use('/categorie', categorieRouter);
app.use('/concert', concertRouter);
app.use('/genre', genreRouter);
app.use('/notification', notificationRouter);
app.use('/pays', paysRouter);
app.use('/reseauxsociaux', reseauxSociauxRouter);
app.use('/role', roleRouter);
app.use('/saison', saisonRouter);
app.use('/scene', sceneRouter);
app.use('/service', serviceRouter);
app.use('/stand', standRouter);
app.use('/typeactu', typeactuRouter);
app.use('/typescene', typesceneRouter);
app.use('/typestand', typestandRouter);
app.use('/utilisateur', utilisateurRouter);
app.use('/status', (req, res) => {
    res.status(200).json({
        error: 0,
        message: "Server is running"
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        error: 1,
        message: "La ressource demandée n'existe pas."
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
});