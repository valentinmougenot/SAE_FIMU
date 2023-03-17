import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize, schema: string) => {
    return sequelize.define("concert", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        heure_debut: {
            type: DataTypes.TIME,
            primaryKey: true,
            allowNull: false
        },
        heure_fin: {
            type: DataTypes.TIME,
            primaryKey: true,
            allowNull: false
        },
        date_debut: {
            type: DataTypes.DATEONLY,
            primaryKey: true,
            allowNull: false
        },
        duree: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                quartHeure: function (value) {
                    if (value % 15 !== 0) {
                        throw new Error('Invalid duration');
                    }
                }
            }
        },
        nbPersonnes: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        schema: schema,
        timestamps: false,
        freezeTableName: true
    });
}