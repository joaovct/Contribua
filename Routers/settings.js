const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")
const causesController = require("../controllers/causesController")
const validations = require("../helpers/validations")
const multer = require("multer")
const multerConfig = require("../config/multer")

router.get("/", async (req, res) => {
    const aux = req.session.user.dateBirthVolunteer.split("T")
    req.session.user.dateBirthVolunteer = aux[0]
    const category = await causesController.listCausesUser(req.session.user.idVolunteer)
    const categoryNotParticipe = await causesController.listCausesNotParticipeUser(req.session.user.idVolunteer)
    res.render('user/settings', {data: req.session.user, dataHeader: req.session.user, causes: category, noParticipe: categoryNotParticipe})
})

router.post('/edit-profile', multer(multerConfig.user()).single('photo'), async (req, res) => {
    const dataUser = req.body
    const dataPhoto = req.file

    if(!validations.filledField(dataUser.name)){
        req.flash("error_msg", "O nome deve ter no mínimo 4 caracteres!")
        return res.redirect("/settings")
    }

    if(!validations.filledField(dataUser.lastName)){
        req.flash("error_msg", "O sobrenome deve ter no mínimo 4 caracteres!")
        return res.redirect("/settings")
    }

    if(!validations.filledField(dataUser.cep)){
        req.flash("error_msg", "CEP inválido!")
        return res.redirect("/settings")
    }
    
    if(!validations.filledField(dataUser.city)){
        req.flash("error_msg", "Cidade inválida!")
        return res.redirect("/settings")
    }

    if(!validations.filledField(dataUser.district)){
        req.flash("error_msg", "Bairro inválido")
        return res.redirect("/settings")
    }

    if(!validations.filledField(dataUser.address)){
        req.flash("error_msg", "Endereço inválido")
        return res.redirect("/settings")
    }

    req.session.user = await userController.edit(dataUser, req.session.user)

    if(typeof dataPhoto != "undefined"){
        req.session.user.photoVolunteer = await userController.editPhoto(dataPhoto, req.session.user)
    }

    req.flash("success_msg", "Usuário editado com sucesso!")
    return res.redirect("/settings")
    
})

router.post("/change-password", async (req, res) => {
    const data = req.body

    if(!validations.filledField(data.newPassword)){
        req.flash("error_msg","Senha inválida!")
        return res.redirect("/settings")
    }

    if(data.newPassword != data.confirmPassword){
        req.flash("error_msg","Senhas diferentes!")
        return res.redirect("/settings")
    }

    await userController.changePassword(req.body.newPassword, req.session.user.idVolunteer)
    req.flash("success_msg", "Senha alterada com sucesso!")
    return res.redirect("/settings")
})

router.post("/edit-causes", async (req, res) => {
    const categories = req.body.categories

    if(typeof categories === "undefined"){
        req.flash("error", "Você precisa ter ao menos uma causa cadastrada!")
        return res.redirect("/settings")
    }

    if(Array.isArray(categories))
        await causesController.editCausesUser(req.session.user.idVolunteer, categories)
    else
        await causesController.editCauseUser(req.session.user.idVolunteer, categories)

    return res.redirect("/settings")
})

router.post("/deactivate-account", async (req, res) => {
    await userController.deactivateAccount(req.session.user.idVolunteer)
    req.session.destroy()
    return res.redirect("/")
})

module.exports = router