export const artisteNext = (sequelize, Sequelize) => {
    const ArtisteNext = sequelize.define("artistes", {
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return ArtisteNext;
}