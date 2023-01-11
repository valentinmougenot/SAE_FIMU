export const service = (sequelize, Sequelize) => {
    const Service = sequelize.define("services", {
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
        }
    },
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return Service;
}