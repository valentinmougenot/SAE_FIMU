import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("notification", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_envoi: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        heure_envoi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true
    });
}
