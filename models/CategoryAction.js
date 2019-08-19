const db = require("./connect")

const CategoryAction = db.sequelize.define("tbCategoryAction", {
    idCategoryAction: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: db.Sequelize.INTEGER
    },
    idCategory: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbCategory",
            key: "idCategory"
        }
    },
    idAction: {
        allowNull: false,
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbAction",
            key: "idAction"
        }
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

CategoryAction.sync({force: true})

module.exports = CategoryAction