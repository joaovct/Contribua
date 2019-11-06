const db = require("./connect")

const ActionVolunteer = db.sequelize.define("tbActionVolunteer", {
    idActionVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    idVacancyAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVacancyAction",
            key: "idVacancyAction"
        }
    },
    dateInterest: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    dateAcceptedNgo: {
        type: db.Sequelize.DATE
    },
    attendance: {
        type: db.Sequelize.STRING(25)
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//ActionVolunteer.sync({force: true})

module.exports = ActionVolunteer