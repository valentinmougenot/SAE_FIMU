export const propose = (sequelize, Sequelize) => {
    const Propose = sequelize.define("propose", {
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
        schema: 'currentseason',
        timestamps: false,
        freezeTableName: true
    });

    return Propose;
}