export const possedePrevious = (sequelize, Sequelize) => {
    const PossedePrevious = sequelize.define("possede", {
        id_artiste: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'artiste',
                key: 'id',
                schema: 'currentseason'
            }
        },
        id_reseaux_sociaux: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'reseauxSociaux',
                key: 'id'
            }
        },
        lien: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isUrl: true
            }
        }
    },
    {
        schema: 'previousseasons',
        timestamps: false,
        freezeTableName: true
    });
    
    return PossedePrevious;
}