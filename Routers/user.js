const express = require('express')
const router = express.Router()
const validations = require("../helpers/validations")
const ngoController = require("../controllers/ngoController")
const userController = require("../controllers/userController")
const causesController = require("../controllers/causesController")

router.get('/', (req,res)=>{
    res.render('user/home', {data: req.session.user})
})

router.get('/profile', async (req,res)=>{
    const category = await causesController.listCausesUser(req.session.user.idVolunteer)
    res.render('user/profile', {data: req.session.user, causes: category})
})

router.post('/edit-profile', async (req, res) => {

    const dataUser = req.body

    if(!validations.filledField(dataUser.name)){
        req.flash("error_msg", "O nome deve ter no mínimo 4 caracteres!")
        return res.redirect("/user/settings")
    }

    if(!validations.filledField(dataUser.lastName)){
        req.flash("error_msg", "O sobrenome deve ter no mínimo 4 caracteres!")
        return res.redirect("/user/settings")
    }

    if(!validations.filledField(dataUser.cep)){
        req.flash("error_msg", "CEP inválido!")
        return res.redirect("/user/settings")
    }
    
    if(!validations.filledField(dataUser.city)){
        req.flash("error_msg", "Cidade inválida!")
        return res.redirect("/user/settings")
    }

    if(!validations.filledField(dataUser.district)){
        req.flash("error_msg", "Bairro inválido")
        return res.redirect("/user/settings")
    }

    if(!validations.filledField(dataUser.address)){
        req.flash("error_msg", "Endereço inválido")
        return res.redirect("/user/settings")
    }

    req.session.user = await userController.edit(dataUser, req.session.user)

    req.flash("success_msg", "Usuário editado com sucesso!")
    return res.redirect("/user/profile")
    
})

router.post("/change-password", async (req, res) => {
    const data = req.body

    if(!validations.filledField(data.newPassword)){
        req.flash("error_msg","Senha inválida!")
        return res.redirect("/user/settings")
    }

    if(data.newPassword != data.confirmPassword){
        req.flash("error_msg","Senhas diferentes!")
        return res.redirect("/user/settings")
    }

    await userController.changePassword(req.body.newPassword, req.session.user.idVolunteer)
    req.flash("success_msg", "Senha alterada com sucesso!")
    return res.redirect("/user/settings")
})

router.post("/edit-causes", async (req, res) => {
    const categories = req.body.categories

    if(typeof categories === "undefined"){
        req.flash("error", "Você precisa ter ao menos uma causa cadastrada!")
        return res.redirect("/user/settings")
    }

    if(Array.isArray(categories))
        await causesController.editCausesUser(req.session.user.idVolunteer, categories)
    else
        await causesController.editCauseUser(req.session.user.idVolunteer, categories)

    return res.redirect("/user/settings")
})

router.post("/deactivate-account", async (req, res) => {
    await userController.deactivateAccount(req.session.user.idVolunteer)
    req.session.destroy()
    return res.redirect("/")
})

router.get('/starting-ong', (req, res) => {
    res.render('register/presentation', {data: req.session.user})
})

router.get('/starting-ong/register', (req, res) => {
    res.render('register/addNGO', {data: req.session.user})
})

router.post('/starting-ong/register', async (req, res) => {

    req.body.ngoCNPJ = req.body.ngoCNPJ.replace(/\D/g,"")
    req.body.ngoTelephone = req.body.ngoTelephone.replace(/\D/g,"")

    const dataNgo = req.body

    //validations
    if(!validations.filledField(dataNgo.ngoName)){
        req.flash("error_msg", "O nome deve ter no mínimo 4 caracteres!")
        return res.redirect("/user/starting-ong/register")
    }

    if(!validations.filledField(dataNgo.ngoAddress)){
        req.flash("error_msg", "O endereço deve ter no mínimo 4 caracteres!")
        return res.redirect("/user/starting-ong/register")
    }

    if(!validations.isCNPJ(dataNgo.ngoCNPJ)){
        req.flash("error_msg", "CNPJ inválido")
        return res.redirect("/user/starting-ong/register")
    }

    if(!validations.filledField(dataNgo.ngoTelephone)){
        req.flash("Telefone inválido!")
        return res.redirect("/user/starting-ong/register")
    }

    if(!validations.email(dataNgo.ngoEmail)){
        req.flash("Email inválido")
        return res.redirect("/user/starting-ong/register")
    }

    const resp = await ngoController.register(dataNgo, req.session.user.idVolunteer)

    req.flash(resp.type_msg, resp.msg)
    if(resp.type_msg === "success_msg")
        return res.redirect("/user")
    else
        return res.redirect("/user/starting-ong/register")
    
})

router.get('/settings', async (req,res)=>{
    const aux = req.session.user.dateBirthVolunteer.split("T")
    req.session.user.dateBirthVolunteer = aux[0]

    const category = await causesController.listCausesUser(req.session.user.idVolunteer)
    const categoryNotParticipe = await causesController.listCausesNotParticipeUser(req.session.user.idVolunteer)

    res.render('user/settings', {data: req.session.user, causes: category, noParticipe: categoryNotParticipe})
})

module.exports = router