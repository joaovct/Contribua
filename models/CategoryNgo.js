const db = require("./connect")

const CategoryNgo = db.sequelize.define("tbCategoryNgo", {
    idCategoryNgo: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idCategory: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbCategory",
            key: "idCategory"
        }
    },
    idNgo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//CategoryNgo.sync({force: true})

module.exports = CategoryNgo