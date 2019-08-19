const db = require("./connect")

const Category = db.sequelize.define("tbCategory", {
    idCategory: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    descCategory: {
        allowNull: false,
        type: db.Sequelize.STRING(50)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//Category.sync({force: true})

module.exports = Category