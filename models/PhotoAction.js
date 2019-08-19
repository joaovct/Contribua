const db = require("./connect")

const PhotoAction = db.sequelize.define("tbPhotoAction", {
    idPhotoAction: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: db.Sequelize.INTEGER
    },
    photoAction: {
        type: db.Sequelize.STRING(80)
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//PhotoAction.sync({force: true})

module.exports = PhotoAction