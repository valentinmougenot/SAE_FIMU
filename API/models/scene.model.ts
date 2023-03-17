import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("scene", {
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
        jauge: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: true
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
