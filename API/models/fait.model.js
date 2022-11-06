export const fait = (sequelize, Sequelize) => {
    const Fait = sequelize.define("fait", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id'
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
    });

    return Fait;
}