export const fait = (sequelize, Sequelize) => {
    const Fait = sequelize.define("fait", {
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
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Fait;
}