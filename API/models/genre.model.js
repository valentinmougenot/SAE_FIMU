export const genre = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genre", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Genre;
}
