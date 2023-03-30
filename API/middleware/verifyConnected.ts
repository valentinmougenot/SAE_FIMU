import {dbCommon} from "../models";
const checkAdmin = async (req, res, next) => {
    const utilisateur = await dbCommon.utilisateurs.findOne({
        where: {
            id: req.userId
        },
        include: [
            {
                model: dbCommon.roles,
            }
        ]
    });

    if (!utilisateur) {
        res.status(400).send({
            message: "Echoué ! Utilisateur non connecté"
        });
        return;
    }
    if (utilisateur.role.libelle !== 'Administrateur') {
        res.status(401).send({
            message: "Echoué ! Utilisateur non administrateur"
        });
        return;
    }

    next();
}

const verifyConnected = {
    checkAdmin
}

export default verifyConnected;