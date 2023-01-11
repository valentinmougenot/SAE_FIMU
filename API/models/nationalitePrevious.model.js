export const nationalitePrevious = (sequelize, Sequelize) => {
    const NationalitePrevious = sequelize.define("nationalites", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'previousseasons'
            }
        },
        id_pays: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'pays',
                key: 'id'
            }
        }
    },
    {
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true
    });

    return NationalitePrevious;
}