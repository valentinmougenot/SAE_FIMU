import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("categorie", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        couleur: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isHexColor: true
            }
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['libelle']
            }
        ]
    });
}