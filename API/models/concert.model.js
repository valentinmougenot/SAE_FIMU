export const concert = (sequelize, Sequelize) => {
    const Concert = sequelize.define("concerts", {
        id: {
            type: Sequelize.INTEGER,
        },
        id_scene: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'scene',
                key: 'id',
                schema: 'currentseason'
            }
        },
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
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
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Concert;
}