import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("saison", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        annee: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        noMois: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        couleur1: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isHexColor: true
            }
        },
        couleur2: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isHexColor: true
            }
        },
        banniere: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['annee', 'noMois']
            }
        ]
    });
}