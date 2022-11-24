export const genre = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genres", {
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

    return Genre;
}
