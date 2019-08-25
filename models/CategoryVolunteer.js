const db = require("./connect")

const CategoryVolunteer = db.sequelize.define("tbCategoryVolunteer", {
    idCategoryVolunteer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    idCategory: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbCategory",
            key: "idCategory"
        }
    },
    idVolunteer: {
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//CategoryVolunteer.sync({force: true})

module.exports = CategoryVolunteer