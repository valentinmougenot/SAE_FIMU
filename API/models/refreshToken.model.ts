import config from '../config/auth.config';
import {v4 as uuidv4} from 'uuid';
import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    const RefreshToken = sequelize.define('refreshToken', {
        token: {
            type: DataTypes.STRING,
        },
        expiryDate: {
            type: DataTypes.DATE,
        }
    }, {
        schema: schema,
    });

    // @ts-ignore
    RefreshToken.createToken = async (user: any) => {
        let expiratedAt = new Date();
        expiratedAt.setSeconds(expiratedAt.getSeconds() + config.jwtRefreshExpiration);
        const _token = uuidv4();
        const refreshToken = await RefreshToken.create({
            token: _token,
            userId: user.id,
            expiryDate: expiratedAt.getTime()
        });
        // @ts-ignore
        return refreshToken.token;
    }

    // @ts-ignore
    RefreshToken.verifyExpiration = (token: any) => {
        return token.expiryDate.getTime() < new Date().getTime();
    }

    return RefreshToken;
}