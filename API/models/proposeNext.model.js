export const proposeNext = (sequelize, Sequelize) => {
    const ProposeNext = sequelize.define("propose", {
        id_stand: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'stands',
                key: 'id'
            }
        },
        id_service: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id'
            }
        }
    },
    {
        schema: 'nextseason',
        timestamps: false,
        freezeTableName: true
    });

    return ProposeNext;
}