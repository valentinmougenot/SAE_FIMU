export const categorie = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("categories", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        couleur: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [7, 7],
                isHexColor: true
            }
        }
    }, 
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });
    return Categorie;
}