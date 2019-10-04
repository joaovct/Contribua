const Ngo = require("../models/Ngo")
const verifyEmail = require("../helpers/verifyEmail")
const telephoneController = require("./telephoneController")
const verifyTelephone = require("../helpers/verifyTelephone")
const verifyCNPJ = require("../helpers/verifyCNPJ")
const userNgoController = require("./userNgoController")
const causesController = require("./causesController")

module.exports = {
    async register(dataNgo, idUser) {
        let type_msg
        let msg
        const hasEmailNgo = await verifyEmail.ngo(dataNgo)
        const hasPhone = await verifyTelephone(dataNgo.ngoTelephone)
        const hasCNPJ = await verifyCNPJ(dataNgo.ngoCNPJ)
        
        if(!hasEmailNgo){
            if(!hasPhone){
                if(!hasCNPJ){
                    const ngo = await Ngo.create({
                                            nameNgo: dataNgo.ngoName,
                                            descriptionNgo: dataNgo.ngoDescription,
                                            cnpjNgo: dataNgo.ngoCNPJ,
                                            emailNgo: dataNgo.ngoEmail,
                                            userName: dataNgo.ngoUserName,
                                            siteNgo: "www.site.com",
                                            cepNgo: "084604300",
                                            cityNgo: "SP",
                                            districtNgo: "Guaianases",
                                            addressNgo: dataNgo.ngoAddress,
                                            averageStarsNgo: "0"
                                        })
    
                    await telephoneController.registerPhoneNgo(ngo.idNgo, dataNgo.ngoTelephone)
                    await userNgoController.registerCreator(ngo.idNgo, idUser)
                    await causesController.registerCausesNgo(ngo.idNgo, dataNgo.categories)
                }else{
                    type_msg = "error_msg"
                    msg = "CNPJ informado já existe!"
                    return {type_msg, msg}  
                }
            }else{
                type_msg = "error_msg"
                msg = "Já existe um telefone com este número!"
                return {type_msg, msg}
            }
        }else{
            type_msg = "error_msg"
            msg = "Já existe uma conta com este email!"
            return {type_msg, msg}
        }

        type_msg = "success_msg"
        msg = "Ong cadastrada com sucesso!"
        return {type_msg, msg}
    }
}