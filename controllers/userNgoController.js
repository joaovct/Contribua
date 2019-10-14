const UserNgo = require("../models/UserNgo")
const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")

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
    async delete(idNgo, idUser){
        await UserNgo.destroy({where: {idVolunteer: idUser, idNgo: idNgo}})
    },
    async listNgo(idUser){
        const userNgo = await UserNgo.findAll({where: {idVolunteer: idUser}})
        let ngo = []
        for(let i in userNgo){
            ngo[i] = await Ngo.findOne({where: {idNgo: userNgo[i].idNgo}})
        }
        return ngo
    },
    async listOneNgo(idUser, idNgo){
        const userNgo = await UserNgo.findOne({where: {idVolunteer: idUser, idNgo: idNgo}})
        let ngo
        if(userNgo)
            ngo = await Ngo.findOne({where: {idNgo: userNgo.idNgo}})
        return ngo
    },
    async listUser(idNgo){
        const userNgo = await UserNgo.findAll({where: {idNgo: idNgo}})
        let user = []
        for(let i in userNgo){
            user[i] = await User.findOne({where:{idVolunteer: userNgo[i].idVolunteer}})
        }
        return user
    }

}