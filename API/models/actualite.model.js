export const actualite = (sequelize, Sequelize) => {
    const Actualite = sequelize.define("actualites", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contenu: {
            type: Sequelize.STRING,
            allowNull: false,
            validate : {
                len: [1, 65535]
            }
        },
        date_envoi: {
            type: Sequelize.DATE
        },
        id_typeactu: {
            type: Sequelize.INTEGER,
            allowNull: false,
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