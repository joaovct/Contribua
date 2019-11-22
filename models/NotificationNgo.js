const db = require("./connect")

const NotificationNgo = db.sequelize.define("tbNotificationNgo", {
    idNotification: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idVolunteer: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    idNgo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    },
    msgNotification:{
        type: db.Sequelize.STRING(300),
        allowNull: false
    },
    linkNotification: {
        type: db.Sequelize.STRING(300)
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

// NotificationNgo.sync({force: true})

module.exports = NotificationNgo