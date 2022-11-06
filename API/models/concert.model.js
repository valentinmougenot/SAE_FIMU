export const concert = (sequelize, Sequelize) => {
    const Concert = sequelize.define("concert", {
        id_scene: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_artiste: {
            type: Sequelize.INTEGER,
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
    });

    return Concert;
}