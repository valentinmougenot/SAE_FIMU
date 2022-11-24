export const role = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
    },
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });
    return Role;
}