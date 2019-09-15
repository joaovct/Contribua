const Ngo = require("../models/Ngo")

module.exports = async (cnpj) => {
    const ngo = await Ngo.findOne({where: {cnpjNgo: cnpj}})

    if(ngo)
        return ngo
}