export const saison = (sequelize, Sequelize) => {
    const Saison = sequelize.define("saisons", {
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
    },
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });
    return Saison;
}