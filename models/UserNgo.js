const db = require("./connect")

const UserNgo = db.sequelize.define("tbUserNgo", {
    idUserNgo: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idVolunteer: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbVolunteer",
            key: "idVolunteer"
        }
    },
    idNgo: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "tbNgo",
            key: "idNgo"
        }
    },
    isCreator: {
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    }
}, {
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//UserNgo.sync({force: true})

module.exports = UserNgo