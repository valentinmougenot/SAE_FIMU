export const artistePrevious = (sequelize, Sequelize) => {
    const ArtistePrevious = sequelize.define("artistes", {
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
        lien_site: {
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
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true
    });

    return ArtistePrevious;
}