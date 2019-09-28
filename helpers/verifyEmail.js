const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")

module.exports = {
    async user(emailVolunteer){
        const user = await User.findOne({where: {emailVolunteer: emailVolunteer, activeVolunteer: true}})

        if(user)
            return user
    },
    async ngo(emailNgo){
        const ngo = await Ngo.findOne({where: {emailNgo: emailNgo}})

        if(ngo)
            return ngo
    }
}