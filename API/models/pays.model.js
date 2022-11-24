export const pays = (sequelize, Sequelize) => {
    const Pays = sequelize.define("pays", {
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
    return Pays;
}
