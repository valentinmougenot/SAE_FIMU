export const utilisateur = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateurs", {
        identifiant: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        mot_de_passe: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
                key: 'id'
            }
        }
    },
    {
        schema: 'common',
        freezeTableName: true,
        timestamps: false
    });
    return Utilisateur;
}