export const typestand = (sequelize, Sequelize) => {
    const TypeStand = sequelize.define("typestand", {
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
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return TypeStand;
}