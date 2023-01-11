export const stand = (sequelize, Sequelize) => {
    const Stand = sequelize.define("stands", {
        id : {
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
        id_typestand: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'typestand',
                key: 'id'
            }
        }
    },
    {
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Stand;
}