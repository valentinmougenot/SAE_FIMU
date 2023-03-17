import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("reseauxSociaux", {
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
        logo: {
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
                fields: ['libelle']
            }
        ]
    });
}