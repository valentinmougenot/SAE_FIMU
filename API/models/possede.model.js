export const possede = (sequelize, Sequelize) => {
    const Possede = sequelize.define("possede", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
            }
        },
        id_reseaux_sociaux: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'reseauxSociaux',
                key: 'id'
            }
        },
        lien: {
            type: Sequelize.STRING
        }
    },
    {
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });
    
    return Possede;
}