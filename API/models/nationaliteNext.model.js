export const nationaliteNext = (sequelize, Sequelize) => {
    const NationaliteNext = sequelize.define("nationalites", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'nextseason'
            }
        },
        id_pays: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'pays',
                key: 'id'
            }
        }
    },
    {
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return NationaliteNext;
}