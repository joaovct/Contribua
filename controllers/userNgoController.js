const UserNgo = require("../models/UserNgo")
const Ngo = require("../models/Ngo")

module.exports = {
    registerCreator(idNgo, idUser){
        UserNgo.create({
            idVolunteer: idUser,
            idNgo: idNgo,
            isCreator: true
        })
    },
    register(idNgo, idUser){
        UserNgo.create({
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