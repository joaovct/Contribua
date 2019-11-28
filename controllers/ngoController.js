const Ngo = require("../models/Ngo")
const UserNgo = require('../models/UserNgo')
const verifyEmail = require("../helpers/verifyEmail")
const telephoneController = require("./telephoneController")
const verifyTelephone = require("../helpers/verifyTelephone")
const verifyCNPJ = require("../helpers/verifyCNPJ")
const userController = require('../controllers/userController')
const userNgoController = require("./userNgoController")
const causesController = require("./causesController")

module.exports = {
    async register(dataNgo, idUser) {
        let type_msg
        let msg
        const hasEmailNgo = await verifyEmail.ngo(dataNgo.ngoEmail)
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
                                            photoNgo: "user.svg",
                                            siteNgo: "",
                                            cepNgo: dataNgo.ngoCEP,
                                            cityNgo: dataNgo.ngoCity,
                                            districtNgo: dataNgo.ngoDistrict,
                                            addressNgo: dataNgo.ngoAddress,
                                            numAddressNgo: dataNgo.ngoAddressNumber,
                                            averageStarsNgo: 0
                                        })
    
                    await telephoneController.registerPhoneNgo(ngo.idNgo, dataNgo.ngoTelephone)
                    await userNgoController.registerCreator(ngo.idNgo, idUser)
                    if(Array.isArray(dataNgo.categories))
                        await causesController.registerCausesNgo(ngo.idNgo, dataNgo.categories)
                    else
                        await causesController.registerCauseNgo(ngo.idNgo, dataNgo.categories)
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
    },
    async edit(dataNgo, sessionNgo){
        await Ngo.update({
                        nameNgo: dataNgo.name,
                        descriptionNgo: dataNgo.description,
                        cepNgo: dataNgo.cep,
                        cityNgo: dataNgo.city,
                        districtNgo: dataNgo.district,
                        addressNgo: dataNgo.address,
                        numAddressNgo: dataNgo.number,
                        siteNgo: dataNgo.site
                    },{where: {idNgo: sessionNgo.idNgo}})

            sessionNgo.nameNgo = dataNgo.name
            sessionNgo.descriptionNgo = dataNgo.description
            sessionNgo.cepNgo = dataNgo.cep
            sessionNgo.cityNgo = dataNgo.city
            sessionNgo.districtNgo = dataNgo.district
            sessionNgo.addressNgo = dataNgo.address
            sessionNgo.numAddressNgo = dataNgo.number
            sessionNgo.siteNgo = dataNgo.site

            return sessionNgo
    },
    async editPhoto(dataPhoto, sessionNgo){
        await Ngo.update({
            photoNgo: dataPhoto.filename
        },{where: {idNgo: sessionNgo.idNgo}})

        sessionNgo.photoNgo = dataPhoto.filename
        return sessionNgo.photoNgo
    },
    async changePassword(newPassword, idNgo){
        await Ngo.update({passwordNgo: newPassword}, {where: {idNgo: idNgo}})
    },
    async deactivateAccount(idNgo){
        await Ngo.update({activeNgo: false}, {where: {idNgo: idNgo}})
    },
    async listOneNgo(idNgo){
        const ngo = await Ngo.findOne({where: {idNgo: idNgo}})
        return ngo
    },
    async listMembersNgo(idNgo){
        const idVolunteers = await UserNgo.findAll({attributes: ['idVolunteer','isCreator', 'isAdmin'], where: {idNgo}})
        let membersNgo = {
            volunteers: [],
            qtdMembers: 0
        }
        let i = 0
        for (let id of idVolunteers){
            let volunteer = await userController.listOneUser(id.idVolunteer)
            if(volunteer){
                i++
                membersNgo.volunteers.push({
                    idVolunteer: volunteer.idVolunteer,
                    nameVolunteer: volunteer.nameVolunteer,
                    lastNameVolunteer: volunteer.lastNameVolunteer,
                    photoVolunteer: volunteer.photoVolunteer,
                    averageStarsVolunteer: volunteer.averageStarsVolunteer,
                    cityVolunteer: volunteer.cityVolunteer,
                    districtVolunteer: volunteer.districtVolunteer,
                    isCreator: (id.isCreator ? true : false),
                    isAdmin: (id.isAdmin ? true : false)
                })
            }
        }
        if(i>0) membersNgo.qtdMembers = i
        else membersNgo = false
        return membersNgo
    }
}