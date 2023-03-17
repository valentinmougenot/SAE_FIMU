import dotenv from "dotenv";
dotenv.config();

const secret = process.env.AUTH_SECRET || 'darth-vader';

export default {
    secret: secret,
    jwtExpiration: 900,
    jwtRefreshExpiration: 86400
}

