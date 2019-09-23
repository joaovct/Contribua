const User = require("../models/Volunteer")
const verifyEmail = require("../helpers/verifyEmail")
const verifyCPF = require("../helpers/verifyCPF")
const causesController = require("./causesController")

module.exports = {
    async register(dataUser){
        let type_msg
        let msg
        const hasEmailUser = await verifyEmail.user(dataUser)
        const hasCPF = await verifyCPF(dataUser.cpfVolunteer)

        if(!hasEmailUser){
            if(!hasCPF){
                const user = await User.create({
                                            nameVolunteer: dataUser.nameVolunteer,
                                            lastNameVolunteer: dataUser.lastNameVolunteer,
                                            cpfVolunteer: dataUser.cpfVolunteer,
                                            emailVolunteer: dataUser.emailVolunteer,
                                            passwordVolunteer: dataUser.passwordVolunteer,
                                            genreVolunteer: "M",
                                            dateBirthVolunteer: dataUser.dateBornVolunteer,
                                            cepVolunteer: dataUser.cepVolunteer,
                                            cityVolunteer: dataUser.cityVolunteer,
                                            districtVolunteer: dataUser.districtVolunteer,
                                            addressVolunteer: dataUser.addressVolunteer,
                                            avarageStarsVolunteer: "0",
                                            activeVolunteer: true
                                        })
                await causesController.registerCausesUser(user.idVolunteer, dataUser.categories)
            }else{
                type_msg = "error_msg"
                msg = "Já existe uma conta com o CPF informado!"
                return {type_msg, msg}
            }
        }else{
            type_msg = "error_msg"
            msg = "Já existe uma conta com este e-mail!"
            return {type_msg, msg}
        }

        type_msg = "success_msg"
        msg = "Usuário cadastrado com sucesso!"
        return {type_msg, msg}
    },
    async edit(dataUser, sessionUser){
        await User.update({
                        nameVolunteer: dataUser.name,
                        lastNameVolunteer: dataUser.lastName,
                        biographyVolunteer: dataUser.biography,
                        dateBirthVolunteer: dataUser.dateBirth,
                        photoVolunteer: dataUser.photo,
                        cepVolunteer: dataUser.cep,
                        cityVolunteer: dataUser.city,
                        districtVolunteer: dataUser.district,
                        addressVolunteer: dataUser.address
                    },{where: {idVolunteer: sessionUser.idVolunteer}})

            sessionUser.nameVolunteer = dataUser.name
            sessionUser.lastNameVolunteer = dataUser.lastName
            sessionUser.biographyVolunteer = dataUser.biography
            sessionUser.dateBirthVolunteer = dataUser.dateBirth
            sessionUser.photoVolunteer = dataUser.photo
            sessionUser.cepVolunteer = dataUser.cep
            sessionUser.cityVolunteer = dataUser.city
            sessionUser.districtVolunteer = dataUser.district
            sessionUser.addressVolunteer = dataUser.address

            return sessionUser
    },
    async changePassword(newPassword, idUser){
        await User.update({passwordVolunteer: newPassword}, {where: {idVolunteer: idUser}})
    },
    async deactivateAccount(idUser){
        await User.update({activeVolunteer: false}, {where: {idVolunteer: idUser}})
    }
}