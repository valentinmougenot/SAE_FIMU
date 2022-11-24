export const jouePrevious = (sequelize, Sequelize) => {
    const JouePrevious = sequelize.define("joue", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id'
            }
        },
        annee: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'annee',
                key: 'id'
            }
        }
    },
    {
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true
    });

    return JouePrevious;
}