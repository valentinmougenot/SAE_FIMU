export const concert = (sequelize, Sequelize) => {
    const Concert = sequelize.define("concerts", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_scene: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'scene',
                key: 'id',
                schema: 'currentseason'
            }
        },
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
            }
        },
        heure_debut: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                isTime: true
            }
        },
        date_debut: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        duree: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                quartHeure: function (value) {
                    if (value % 15 !== 0) {
                        throw new Error('Invalid duration');
                    }
                }
            }
        },
        nb_personnes: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        annee: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'annee',
                key: 'annee'
            }
        }
    },
    {
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Concert;
}