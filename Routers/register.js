const express = require('express')
const router = express.Router()
const validations = require("../helpers/validations")
const userController = require("../controllers/userController")
const userNgoController = require('../controllers/userNgoController')
const causesController = require('../controllers/causesController')

router.get('/', async (req, res)=>{
    const categories = await causesController.listCauses() 
    res.render('register/registerUser', {causes: categories})
})

router.post("/registerUser", async (req, res) => {
    req.body.cpfVolunteer = req.body.cpfVolunteer.replace(/\D/g,"")
    req.body.cepVolunteer = req.body.cepVolunteer.replace(/\D/g,"")

    const dataUser = req.body

    if(!validations.filledField(dataUser.nameVolunteer)){
        req.flash("error_msg", "O nome deve ter no mínimo 4 caracteres!")
        return res.redirect("/register")
    }
        
    if(!validations.filledField(dataUser.lastNameVolunteer)){
        req.flash("error_msg", "O sobrenome deve ter no mínimo 4 caracteres!")
        return res.redirect("/register")
    }

    if(!validations.email(dataUser.emailVolunteer)){
        req.flash("error_msg", "E-mail inválido!")
        return res.redirect("/register")
    }

    if(!validations.isCPF(dataUser.cpfVolunteer)){
        req.flash("error_msg", "CPF inválido!")
        return res.redirect("/register")
    }

    if(!validations.filledField(dataUser.cepVolunteer)){
        req.flash("error_msg", "CEP inválido!")
        return res.redirect("/register")
    }

    if(!validations.filledField(dataUser.cityVolunteer)){
        req.flash("error_msg", "A Cidade deve ter no mínimo 4 caracteres!")
        return res.redirect("/register")
    }

    if(!validations.filledField(dataUser.districtVolunteer)){
        req.flash("error_msg", "O Bairro deve ter no mínimo 4 caracteres")
        return res.redirect("/register")
    }

    if(!validations.filledField(dataUser.addressVolunteer)){
        req.flash("error_msg", "A rua deve ter no mínimo 4 caracteres")
        return res.redirect("/register")
    }

    if(!validations.filledField(dataUser.passwordVolunteer)){
        req.flash("error_msg", "A senha deve ter no mínimo 4 caracteres!")
        return res.redirect("/register")
    }

    if(dataUser.passwordVolunteer != dataUser.confirmPasswordVolunteer){
        req.flash("error_msg", "As senhas estão diferentes!")
        return res.redirect("/register")
    }

    const resp = await userController.register(dataUser)

    req.flash(resp.type_msg, resp.msg)

    if(resp.type_msg === "success_msg"){
        req.session.user = resp.user
        req.session.ngoUser = await userNgoController.listNgoCreator(req.session.user.idVolunteer)
        return res.redirect("/home")
    }else{
        return res.redirect("/register")
    }

})

module.exports = router