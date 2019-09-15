const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")

module.exports = {
    async user(dataUser){
        const user = await User.findOne({where: {emailVolunteer: dataUser.emailVolunteer}})

        if(user)
            return user
    },
    async ngo(dataNgo){
        const ngo = await Ngo.findOne({where: {emailNgo: dataNgo.ngoEmail}})

        if(ngo)
            return ngo
    }
}