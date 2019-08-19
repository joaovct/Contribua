const db = require("./connect.js")

const TelephoneNgo = db.sequelize.define("tbTelephoneNgo", {
    idTelephoneNgo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
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
    TelephoneNgo: {
        allowNull: false,
        type: db.Sequelize.STRING(15)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//TelephoneNgo.sync({force: true})

module.exports = TelephoneNgo