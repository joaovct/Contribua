const Sequelize = require('sequelize')
const sequelize = new Sequelize("dbcontribua", "root", "", {
    host: "localhost",
    dialect: "mysql",
    charset: "utf8",
    collate: "utf8_general_ci"
})

sequelize.authenticate().then(() => {
    console.log("Conectado com sucesso!")
}).catch((err) => {
    console.log("Falha ao se conectar, erro: "+err)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}