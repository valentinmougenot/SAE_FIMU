import {dbCommon} from "../models";

const checkDuplicateUsername = async (req, res, next) => {
    const utilisateur = await dbCommon.utilisateurs.findOne({
        where: {
            identifiant: req.body.identifiant
        }
    });

    if (utilisateur) {
        res.status(400).send({
            message: "Echoué ! Email déjà utilisé"
        });
        return;
    }

    next();
}

const verifySignUp = {
    checkDuplicateUsername
}

export default verifySignUp;