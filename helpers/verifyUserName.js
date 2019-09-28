const User = require("../models/Volunteer")
const Ngo = require("../models/Ngo")

module.exports = {
    async user(userName){
        const user = await User.findOne({where: {userName: userName}})

        if(user)
            return user
    },
    async ngo(userName){
        const ngo = await Ngo.findOne({where: {userNameNgo: userName}})

        if(ngo)
            return ngo
    }
}