import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({
            message: "Token expiré !"
        });
    }
    console.log(err)
    return res.status(500).send({
        message: "Non autorisé !"
    });
}

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send({
                message: "Aucun token fourni !"
            });
        }
        token = token.split(' ')[1];
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken
}

export default authJwt;