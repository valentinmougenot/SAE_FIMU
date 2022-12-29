export const typeactu = (sequelize, Sequelize) => {
    const TypeActu = sequelize.define("typeactu", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        schema: 'common',
    });

    return TypeActu;
}