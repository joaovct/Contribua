const db = require("./connect")

const VacancyVolunteer = db.sequelize.define("tbVacancyVolunteer", {
    idVacancyVolunteer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    descVacancyVolunteer: {
        allowNull: false,
        type: db.Sequelize.STRING(200)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//VacancyVolunteer.sync({force: true})

module.exports = VacancyVolunteer