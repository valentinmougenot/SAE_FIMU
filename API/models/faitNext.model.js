export const faitNext = (sequelize, Sequelize) => {
    const FaitNext = sequelize.define("fait", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'nextseason'
            }
        },
        id_genre: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'genre',
                key: 'id'
            }
        }
    },
    {
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return FaitNext;
}