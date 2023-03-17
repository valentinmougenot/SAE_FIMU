import {DataTypes, Optional, Sequelize} from "sequelize";
import { hash } from "bcryptjs";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("utilisateur", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        identifiant: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        motDePasse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['identifiant']
            }
        ],
        hooks: {
            beforeCreate: async (utilisateur: any) => {
                if (utilisateur.motDePasse) {
                    utilisateur.motDePasse = await hash(utilisateur.motDePasse);
                }
            },
            beforeUpdate: async (utilisateur: any) => {
                if (utilisateur.motDePasse) {
                    utilisateur.motDePasse = await hash(utilisateur.motDePasse);
                }
            }
        }
    });
}