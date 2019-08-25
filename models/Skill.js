const db = require("./connect")

const Skill = db.sequelize.define("tbSkill", {
    idSkill: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    descSkill: {
        allowNull: false,
        type: db.Sequelize.STRING(50)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//Skill.sync({force: true})

module.exports = Skill