export const sceneNext = (sequelize, Sequelize) => {
    const SceneNext = sequelize.define('scenes', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        jauge: {
            type: Sequelize.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        id_typescene: {
            type: Sequelize.INTEGER,
            allowNull: false,
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