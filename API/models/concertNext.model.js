export const concertNext = (sequelize, Sequelize) => {
    const ConcertNext = sequelize.define("concerts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return ConcertNext;
}