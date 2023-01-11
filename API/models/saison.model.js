export const saison = (sequelize, Sequelize) => {
    const Saison = sequelize.define("saisons", {
        annee: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        couleur1: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [7, 7],
                isHexColor: true
            }
        },
        couleur2: {
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
    return Saison;
}