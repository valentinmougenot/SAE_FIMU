export const scene = (sequelize, Sequelize) => {
    const Scene = sequelize.define('scenes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        jauge: {
            type: Sequelize.INTEGER
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        id_typescene: {
            type: Sequelize.INTEGER,
            references: {
                model: 'typescene',
                key: 'id'
            }
        }
    },
    {
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Scene;
}