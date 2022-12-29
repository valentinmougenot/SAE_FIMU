export const actualite = (sequelize, Sequelize) => {
    const Actualite = sequelize.define("actualites", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING
        },
        contenu: {
            type: Sequelize.STRING
        },
        date_envoi: {
            type: Sequelize.DATE
        },
        id_typeactu: {
            type: Sequelize.INTEGER,
            references: {
                model: 'typeactu',
                key: 'id'
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        schema: 'common',
    });

    return Actualite;
}