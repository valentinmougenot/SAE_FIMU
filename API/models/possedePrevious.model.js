export const possedePrevious = (sequelize, Sequelize) => {
    const PossedePrevious = sequelize.define("possede", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'previousseasons'
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
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true
    });
    
    return PossedePrevious;
}