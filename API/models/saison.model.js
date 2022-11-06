export const saison = (sequelize, Sequelize) => {
    const Saison = sequelize.define("saison", {
        annee: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        couleur1: {
            type: Sequelize.STRING
        },
        couleur2: {
            type: Sequelize.STRING
        }
    });
    return Saison;
}