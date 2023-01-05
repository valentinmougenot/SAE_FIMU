export const standNext = (sequelize, Sequelize) => {
    const StandNext = sequelize.define("stands", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        longitude: {
            type: Sequelize.FLOAT
        },
        id_typestand: {
            type: Sequelize.INTEGER,
            references: {
                model: 'typestand',
                key: 'id'
            }
        }
    },
    {
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return StandNext;
}