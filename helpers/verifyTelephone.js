const TelephoeNgo = require("../models/TelephoneNgo")
const TelephoneVolunteer = require("../models/TelephoneVolunteer")


module.exports = async (telephone) => {

    const ngo = await TelephoeNgo.findOne({where: {telephoneNgo: telephone}})

    if(ngo)
        return ngo

    const user = await TelephoneVolunteer.findOne({where: {telephoneVolunteer: telephone}})

    if(user)
        return user

}