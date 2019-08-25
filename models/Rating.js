const db = require("./connect")

const Rating = db.sequelize.define("tbRating", {
    idRating: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    idActionVolunteer: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbActionVolunteer",
            key: "idActionVolunteer"
        }
    },
    starsVolunteer: {
        allowNull: false,
        type: db.Sequelize.FLOAT,
    },
    starsNgo: {
        allowNull: false,
        type: db.Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//Rating.sync({force: true})

module.exports = Rating