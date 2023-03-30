import {Request, Response} from "express";
import {dbCommon} from "../models";
import config from '../config/auth.config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const signup = async (req: Request, res: Response) => {
    try {
        const utilisateur = await dbCommon.utilisateurs.create(req.body);
        res.status(200).send(utilisateur);
    }
    catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Erreur lors de la création de l'utilisateur"
        });
    }
}

const signin = (req, res) => {
    const utilisateur = dbCommon.utilisateurs.findOne({
        where: {
            identifiant: req.body.identifiant
        },
        include: [
            {
                model: dbCommon.roles,
            }
        ]
    })
        .then(async (utilisateur) => {
            if (!utilisateur) {
                return res.status(404).send({
                    message: "Utilisateur non trouvé"
                });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.motDePasse,
                utilisateur.motDePasse
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Mot de passe incorrect"
                });
            }

            let token = jwt.sign({id: utilisateur.id}, config.secret, {
                expiresIn: config.jwtExpiration
            });
            let refreshToken = await dbCommon.refreshTokens.createToken(utilisateur);

            res.status(200).send({
                id: utilisateur.id,
                identifiant: utilisateur.identifiant,
                role: utilisateur.role.libelle,
                accessToken: token,
                refreshToken: refreshToken
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(500).send({
                message: "Erreur lors de la connexion"
            });
        });
}

const refreshToken = async (req, res) => {
    const {refreshToken: requestToken} = req.body;

    if (requestToken == null) {
        return res.status(403).json({message: 'Le token de rafraîchissement est requis'});
    }
    try {
        let refreshToken = await dbCommon.refreshTokens.findOne({
            where: {
                token: requestToken
            }
        });
        if (!refreshToken) {
            return res.status(403).json({message: 'Le token de rafraîchissement est invalide'});
        }
        if (dbCommon.refreshTokens.verifyExpiration(refreshToken)) {
            await dbCommon.refreshTokens.destroy({
                where: {
                    id: refreshToken.id
                }
            });
            return res.status(403).json({message: 'Le token de rafraîchissement est expiré, veuillez vous reconnecter'});
        }
        const utilisateur = await dbCommon.refreshTokens.getUtilisateurs();
        let newAccessToken = jwt.sign({id: utilisateur.id}, config.secret, {
            expiresIn: config.jwtExpiration
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({message: 'Erreur lors du rafraîchissement du token'});
    }
}

export default {
    signup,
    signin,
    refreshToken
}