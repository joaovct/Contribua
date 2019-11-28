const db = require("./connect")

const Rating = db.sequelize.define("tbRating", {
    idRating: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    idAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbAction",
            key: "idAction"
        }
    },
    idVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    idNgo: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    },
    starsVolunteer: {
        allowNull: true,
        type: db.Sequelize.FLOAT,
    },
    starsNgo: {
        allowNull: true,
        type: db.Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

// Rating.sync({force: true})

module.exports = Rating