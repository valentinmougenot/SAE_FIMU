export const jouePrevious = (sequelize, Sequelize) => {
    const JouePrevious = sequelize.define("joue", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'artiste',
                key: 'id'
            }
        },
        annee: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'annee',
                key: 'id'
            }
        }
    },
    {
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true,
        tableName: 'joue'
    });

    return JouePrevious;
}