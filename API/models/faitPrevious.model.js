export const faitPrevious = (sequelize, Sequelize) => {
    const FaitPrevious = sequelize.define("fait", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
            }
        },
        id_genre: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'genre',
                key: 'id'
            }
        }
    },
    {
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true,
        tableName: 'fait'
    });

    return FaitPrevious;
}