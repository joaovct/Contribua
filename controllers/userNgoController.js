const UserNgo = require("../models/UserNgo")

module.exports = {
    registerCreator(idNgo, idUser){
        UserNgo.create({
            idVolunteer: idUser,
            idNgo: idNgo,
            isCreator: true
        })
    },
    register(idUser, idNgo){
        UserNgo.create({
            idVolunteer: idUser,
            idNgo: idNgo,
            isCreator: false
        })
    }
}