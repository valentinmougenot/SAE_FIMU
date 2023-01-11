export const possedeNext = (sequelize, Sequelize) => {
    const PossedeNext = sequelize.define("possede", {
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
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });
    
    return PossedeNext;
}