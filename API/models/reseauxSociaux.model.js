export const reseauxSociaux = (sequelize, Sequelize) => {
    const ReseauxSociaux = sequelize.define("reseauxsociaux", {
        id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        libelle: {
            type: Sequelize.STRING
        },
        logo: {
            type: Sequelize.STRING
        },

    },
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return ReseauxSociaux;
}