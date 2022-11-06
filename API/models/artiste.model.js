export const artiste = (sequelize, Sequelize) => {
    const Artiste = sequelize.define("artiste", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING
        },
        biographie: {
            type: Sequelize.STRING
        },
        lien_video: {
            type: Sequelize.STRING
        },
        id_categorie: {
            type: Sequelize.INTEGER,
            references: {
                model: 'categorie',
                key: 'id'
            }
        }
    },
    {
        timestamps: false
    });

    return Artiste;
}


