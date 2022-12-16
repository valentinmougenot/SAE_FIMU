export const artiste = (sequelize, Sequelize) => {
    const Artiste = sequelize.define("artistes", {
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
            allowNull: true,
            references: {
                model: 'categorie',
                key: 'id'
            }
        }
    },
    {
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Artiste;
}


