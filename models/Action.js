const db = require("./connect")

const Action = db.sequelize.define("tbAction", {
    idAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idNgo: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    },
    nameAction: {
        allowNull: false,
        type: db.Sequelize.STRING(50)
    },
    descriptionAction: {
        allowNull: false,
        type: db.Sequelize.STRING(300)
    },
    numberMaxVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER
    },
    placeAction: {
        allowNull: false,
        type: db.Sequelize.STRING(80)
    },
    dateAction: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    idVacancyVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVacancyVolunteer",
            key: "idVacancyVolunteer"
        }
    },
    idPhotoAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbPhotoAction",
            key: "idPhotoAction"
        }
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//Action.sync({fonce: true})

module.exports = Action