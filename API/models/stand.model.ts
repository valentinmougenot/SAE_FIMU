import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("stand", {
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
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: -90,
                max: 90,
                isNumeric: true
            }
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: -180,
                max: 180,
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