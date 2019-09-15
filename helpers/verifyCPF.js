const User = require("../models/Volunteer")

module.exports = async (cpf) => {
    const user = await User.findOne({where: {cpfVolunteer: cpf}})

    if(user)
        return user
}