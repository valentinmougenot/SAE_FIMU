export const categorie = (sequelize, Sequelize) => {
    const Categorie = sequelize.define("categorie", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Categorie;
}