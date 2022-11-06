export const notification = (sequelize, Sequelize) => {
    const Notification = sequelize.define("notification", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date_envoi: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Notification;
}
