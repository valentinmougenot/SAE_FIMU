export const nationalite = (sequelize, Sequelize) => {
    const Nationalite = sequelize.define("nationalite", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id'
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
    });

    return Nationalite;
}