export const utilisateur = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateurs", {
        identifiant: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        mot_de_passe: {
            type: Sequelize.STRING
        },
        id_role: {
            type: Sequelize.INTEGER,
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