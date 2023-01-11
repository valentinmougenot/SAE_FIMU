export const typeactu = (sequelize, Sequelize) => {
    const TypeActu = sequelize.define("typeactu", {
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
        timestamps: false,
        freezeTableName: true,
        schema: 'common',
    });

    return TypeActu;
}