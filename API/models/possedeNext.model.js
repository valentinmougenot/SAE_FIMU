export const possedeNext = (sequelize, Sequelize) => {
    const PossedeNext = sequelize.define("possede", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'nextseason'
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });
    
    return PossedeNext;
}