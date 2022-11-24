export const sceneNext = (sequelize, Sequelize) => {
    const SceneNext = sequelize.define('scenes', {
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return SceneNext;
}