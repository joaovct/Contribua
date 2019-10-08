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
    cepAction: {
        allowNull: false,
        type: db.Sequelize.STRING(10)
    },
    cityAction: {
        allowNull: false,
        type: db.Sequelize.STRING(50)
    },
    districtAction: {
        allowNull: false,
        type: db.Sequelize.STRING(50)
    },
    addressAction: {
        allowNull: false,
        type: db.Sequelize.STRING(80)
    },
    numAddressAction: {
        allowNull: false,
        type: db.Sequelize.STRING(10)
    },
    dateAction: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    dateEndAction: {
        allowNull: false,
        type: db.Sequelize.DATE
    },
    idPhotoAction: {
        type: db.Sequelize.INTEGER,
        references: {
            model: "tbPhotoAction",
            key: "idPhotoAction"
        }
    },
    photoAction: {
        allowNull: false,
        type: db.Sequelize.STRING(80),
    },
    isPunctual: {
        allowNull: false,
        type: db.Sequelize.BOOLEAN
    },
    isActive: {
        allowNull: false,
        type: db.Sequelize.BOOLEAN
    }
},
{
    freezeTableName: true,
    charset: "utf8",
    collate: "utf8_general_ci"
})

//Action.sync({fonce: true})

module.exports = Action