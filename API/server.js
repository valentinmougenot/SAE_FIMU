import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {default as routerArtiste} from './routes/artiste.router.js';
import {db} from './models/index.js';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';

import {default as routerScene} from './routes/scene.router.js';
import {default as routerNotification} from './routes/notification.router.js';
import {default as routerSaison} from './routes/saison.router.js';
import {default as routerCategorie} from './routes/categorie.router.js';
import {default as routerGenre} from './routes/genre.router.js';
import {default as routerConcert} from './routes/concert.router.js';
import {default as routerPays} from './routes/pays.router.js';
import {default as routerTypescene} from './routes/typescene.router.js';
import {default as routerUtilisateur} from './routes/utilisateur.router.js';
import {default as routerRole} from './routes/role.router.js';
import {default as routerNationalite} from './routes/nationalite.router.js';
import {default as routerFait} from './routes/fait.router.js';
import {default as routerPossede} from './routes/possede.router.js';
import {default as routerReseauxSociaux} from './routes/reseauxSociaux.router.js';
import {default as routerArtisteNext} from './routes/artisteNext.router.js';
import {default as routerConcertNext} from './routes/concertNext.router.js';
import {default as routerFaitNext} from './routes/faitNext.router.js';
import {default as routerNationaliteNext} from './routes/nationaliteNext.router.js';
import {default as routerPossedeNext} from './routes/possedeNext.router.js';
import {default as routerSceneNext} from './routes/sceneNext.router.js';
import {default as routerArtistePrevious} from './routes/artistePrevious.router.js';
import {default as routerJouePrevious} from './routes/jouePrevious.router.js';
import {default as routerFaitPrevious} from './routes/faitPrevious.router.js';
import {default as routerNationalitePrevious} from './routes/nationalitePrevious.router.js'
import {default as routerPossedePrevious} from './routes/possedePrevious.router.js';
import {default as routerActualite} from './routes/actualite.router.js';
import {default as routerTypeactu} from './routes/typeactu.router.js';
import {default as routerStand} from './routes/stand.router.js';
import {default as routerTypestand} from './routes/typestand.router.js';
import {default as routerStandNext} from './routes/standNext.router.js';
import {default as routerService} from './routes/service.router.js';
import {default as routerPropose} from './routes/propose.router.js';
import {default as routerProposeNext} from './routes/proposeNext.router.js';

const app = express();

dotenv.config();

const port = process.env.PORT;


db.sequelize.sync()
    .then(() => {
        console.log('Synced db');
    })
    .catch(err => {
        console.log("Failed to sync db: ", err.message);
    });

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
  secret: 'wow very secret',
  cookie: {maxAge: 15 * 60 * 1000},
  saveUninitialized: false,
  resave: false,
  unset: 'destroy'
}));

app.use(cors({
    origin: [
      'http://localhost:8080',
      'https://localhost:8080'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}));

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


app.use('/artiste', routerArtiste);
app.use('/scene', routerScene);
app.use('/notification', routerNotification);
app.use('/saison', routerSaison);
app.use('/categorie', routerCategorie);
app.use('/genre', routerGenre);
app.use('/concert', routerConcert);
app.use('/pays', routerPays);
app.use('/typescene', routerTypescene);
app.use('/utilisateur', routerUtilisateur);
app.use('/role', routerRole);
app.use('/nationalite', routerNationalite);
app.use('/fait', routerFait);
app.use('/possede', routerPossede);
app.use('/reseauxsociaux', routerReseauxSociaux);
app.use('/actualite', routerActualite);
app.use('/typeactu', routerTypeactu);
app.use('/stand', routerStand);
app.use('/typestand', routerTypestand);
app.use('/service', routerService);
app.use('/propose', routerPropose);

app.use('/next/artiste', routerArtisteNext);
app.use('/next/concert', routerConcertNext);
app.use('/next/fait', routerFaitNext);
app.use('/next/nationalite', routerNationaliteNext);
app.use('/next/possede', routerPossedeNext);
app.use('/next/scene', routerSceneNext);
app.use('/next/stand', routerStandNext);
app.use('/next/propose', routerProposeNext);

app.use('/previous/artiste', routerArtistePrevious);
app.use('/previous/joue', routerJouePrevious);
app.use('/previous/fait', routerFaitPrevious);
app.use('/previous/nationalite', routerNationalitePrevious);
app.use('/previous/possede', routerPossedePrevious);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})