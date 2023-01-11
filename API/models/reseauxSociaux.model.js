export const reseauxSociaux = (sequelize, Sequelize) => {
    const ReseauxSociaux = sequelize.define("reseauxsociaux", {
        id : {
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
        },
        logo: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
                len: [1, 255]
            }
        },
    },
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return ReseauxSociaux;
}