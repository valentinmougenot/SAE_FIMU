export const genre = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genres", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
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

    return Genre;
}
