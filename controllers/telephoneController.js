const TelephoneNgo = require("../models/TelephoneNgo")

module.exports = {
    async registerPhoneNgo(idNgo, telephone){
        TelephoneNgo.create({
            idNgo: idNgo,
            TelephoneNgo: telephone
        })
    },
    async listTelephoneNgo(idNgo){
        const telephones = await TelephoneNgo.findAll({where:{idNgo: idNgo}})
        return telephones
    }
}