export const concertNext = (sequelize, Sequelize) => {
    const ConcertNext = sequelize.define("concerts", {
        id_scene: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'sceneNext',
                key: 'id',
                schema: 'nextseason'
            }
        },
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'nextseason'
            }
        },
        heure_debut: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        date_debut: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        duree: {
            type: Sequelize.INTEGER
        },
        nb_personnes: {
            type: Sequelize.INTEGER
        },
        annee: {
            type: Sequelize.INTEGER,
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