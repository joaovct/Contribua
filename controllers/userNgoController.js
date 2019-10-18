const UserNgo = require("../models/UserNgo")
const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")
const causesController = require("./causesController")
const CategoryNgo = require("../models/CategoryNgo")
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
    async listRecommendedNgos(idUser){
        let ngosParticipe = await this.listNgo(idUser)
        let allNgos = await Ngo.findAll()
        let causesUser = await causesController.listCausesUser(idUser)
        let levelRecommended = []

        //ngos not participe
        for(let i in ngosParticipe){
            for(let j in allNgos){
                if(allNgos[j].idNgo === ngosParticipe[i].idNgo){
                    allNgos.splice(j, 1)
                }
            }
        }

        //ngos with volunteer causes
        for(let i in allNgos){
            for(let j in causesUser){
                let causesNgo = await CategoryNgo.findAll({where:{idNgo: allNgos[i].idNgo}})
                for(let k in causesNgo){
                    if(causesUser[j].idCategory === causesNgo[k].idCategory){
                        levelRecommended.push(allNgos[i])
                        break
                    }
                }
            }
        }

        //enter the NGO id and its level of relevance
        let recommendedNgos = []
        let cont = 0
        levelRecommended.filter((elem, i) => {
            if(levelRecommended.indexOf(elem) === i){
                recommendedNgos.push({ngo: elem, level: cont})
                cont = 0
            }else{
                cont++
                recommendedNgos.pop()
                recommendedNgos.push({ngo: elem, level: cont})
            }
        })
        
        //put more relevant ngos at the beginning of the array
        recommendedNgos.sort((a, b) => {
            if(a.level < b.level){
                return 1
            }
        })

        return recommendedNgos
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