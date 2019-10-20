const db = require("./connect")

const VacancyAction = db.sequelize.define("tbVacancyAction", {
    idVacancyAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbAction",
            key: "idAction"
        }
    },
    qtdVacancyAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER
    },
    nameVacancyAction:{
        allowNull: false,
        type: db.Sequelize.STRING(30)
    },
    descVacancyAction:{
        allowNull: false,
        type: db.Sequelize.STRING(50)
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//VacancyAction.sync({force: true})

module.exports = VacancyAction