const db = require("./connect")

const SkillVolunteer = db.sequelize.define("tbSkillVolunteer", {
    idSkillVolunteer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    idVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    idSkill: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbSkill",
            key: "idSkill"
        }
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//SkillVolunteer.sync({force: true})

module.exports = SkillVolunteer