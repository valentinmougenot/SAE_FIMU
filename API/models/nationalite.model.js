export const nationalite = (sequelize, Sequelize) => {
    const Nationalite = sequelize.define("nationalites", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
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
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Nationalite;
}