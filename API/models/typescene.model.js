export const typescene = (sequelize, Sequelize) => {
    const TypeScene = sequelize.define("typescene", {
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
        freezeTableName: true
    });
    return TypeScene;
}