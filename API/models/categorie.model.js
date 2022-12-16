export const categorie = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("categories", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        couleur: {
            type: Sequelize.STRING
        }
    }, 
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });
    return Categorie;
}