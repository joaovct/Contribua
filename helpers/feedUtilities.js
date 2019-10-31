const Ngo = require('../models/Ngo')

module.exports = {
    async formatAction(action){
        action.descriptionAction = action.descriptionAction.substring(0,100) + "..."
        const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        action.createdAt.day = action.createdAt.getDay()
        action.createdAt.month = months[action.createdAt.getMonth()]
        action.createdAt.year = action.createdAt.getFullYear()
        ngo = await Ngo.findOne({where: {idNgo: action.idNgo}, attributes: ['userName','nameNgo']})
        action.nameNgo = ngo.nameNgo
        action.username = ngo.userName
        return action
    }
}