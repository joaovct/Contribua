const UserNgo = require("../models/UserNgo")
const Ngo = require("../models/Ngo")

module.exports = {
    async registerCreator(idNgo, idUser){
        await UserNgo.create({
            idVolunteer: idUser,
            idNgo: idNgo,
            isCreator: true
        })
    },
    async register(idNgo, idUser){
        await UserNgo.create({
            idVolunteer: idUser,
            idNgo: idNgo,
            isCreator: false
        })
    },
    async listNgo(idUser){
        const userNgo = await UserNgo.findAll({where: {idVolunteer: idUser}})
        let ngo = []
        for(let i in userNgo){
            ngo[i] = await Ngo.findOne({where: {idNgo: userNgo[i].idNgo}})
        }
        return ngo
    }
}