const db = require("./connect")

const TelephoneVolunteer = db.sequelize.define("tbTelephoneVolunteer", {
    idTelephoneVolunteer: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    idVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    telephoneVolunteer: {
        type: db.Sequelize.STRING(15)
    },
    cellphoneVolunteer: {
        allowNull: false,
        type: db.Sequelize.STRING(15)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//TelephoneVolunteer.sync({force: true})

module.exports = TelephoneVolunteer