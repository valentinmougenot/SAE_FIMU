export const notification = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notifications", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_envoi: {
            type: Sequelize.STRING
        },
        heure_envoi: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    }, 
    {
        schema: 'common',
        timestamps: false,
        freezeTableName: true
    });

    return Notification;
}
