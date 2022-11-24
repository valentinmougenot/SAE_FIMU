export const fait = (sequelize, Sequelize) => {
    const Fait = sequelize.define("fait", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
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
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Fait;
}