export const artisteNext = (sequelize, Sequelize) => {
    const ArtisteNext = sequelize.define("artistes", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        photo: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 255]
            }
        },
        biographie: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 65535]
            }
        },
        lien_video: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 255],
                isURL: true,
                correctUrl: function (value) {
                    if (!value.includes('youtube.com/embed/')) {
                        throw new Error('Invalid youtube URL');
                    }
                }
            }
        },
        lien_site: {
            type: Sequelize.STRING,
            validate: {
                len: [1, 255],
                isURL: true
            }
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return ArtisteNext;
}