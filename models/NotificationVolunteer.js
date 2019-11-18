const db = require("./connect")

const NotificationVolunteer = db.sequelize.define("tbNotificationVolunteer", {
    idNotification: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idNgo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    },
    idVolunteer: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    msgNotification:{
        type: db.Sequelize.STRING(120),
        allowNull: false
    },
    viewedNotification:{
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

// NotificationVolunteer.sync({force: true})

module.exports = NotificationVolunteer