import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("actualite", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contenu: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        lienImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        dateEnvoi: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        heureEnvoi: {
            type: DataTypes.TIME,
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true
    });
}
