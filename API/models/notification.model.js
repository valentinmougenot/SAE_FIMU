export const notification = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_envoi: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isDate: true
            }
        },
        heure_envoi: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isTime: true
            }
        },
        message: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        }
    }, 
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return Notification;
}
