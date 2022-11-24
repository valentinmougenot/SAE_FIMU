export const typescene = (sequelize, Sequelize) => {
    const TypeScene = sequelize.define("typescenes", {
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
    return TypeScene;
}