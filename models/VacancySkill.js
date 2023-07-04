const db = require("./connect")

const VacancySkill = db.sequelize.define("tbVacancySkill", {
    idVacancySkill: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    idSkill: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbSkill",
            key: "idSkill"
        }
    },
    // idVacancyVolunteer: {
    //     allowNull: false,
    //     type: db.Sequelize.INTEGER,
    //     references: {
    //         model: "tbVacancyVolunteer",
    //         key: "idVacancyVolunteer"
    //     }
    // }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//VacancySkill.sync({force: true})

module.exports = VacancySkill