const TelephoneNgo = require("../models/TelephoneNgo")

module.exports = {
    async registerPhoneNgo(idNgo, telephone){
        TelephoneNgo.create({
            idNgo: idNgo,
            TelephoneNgo: telephone
        })
    }
}