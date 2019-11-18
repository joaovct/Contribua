const Ngo = require('../models/Ngo')

module.exports = {
    async formatAction(action){
        action.descriptionAction = action.descriptionAction.substring(0,100) + "..."
        const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
        action.createdAt.day = action.createdAt.getDate()
        action.createdAt.month = months[action.createdAt.getMonth()]
        action.createdAt.year = action.createdAt.getFullYear()
        ngo = await Ngo.findOne({where: {idNgo: action.idNgo}, attributes: ['userName','nameNgo']})
        action.nameNgo = ngo.nameNgo
        action.username = ngo.userName
        return action
    },
    async formatHours(date){
        let str = date.toString()
        str = str.replace("Z","").replace("T"," ")

        let hours =  (new Date(str).getHours() < 10 ? '0':'') + new Date(str).getHours()
        let minutes = (new Date(str).getMinutes() < 10 ? '0':'') + new Date(str).getMinutes()
        return `${hours}:${minutes}`
    },
    async formatMonthOrDay(date){
        if(date < 10)return "0"+date
        else return date
    }
}