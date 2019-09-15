const express = require('express')
const router = express.Router()
const validations = require("../helpers/validations")
const userController = require("../controllers/userController")

router.get('/', (req, res)=>{
    res.render('register/registerUser')
})

router.post("/registerUser", async (req, res) => {
    req.body.cpfVolunteer = req.body.cpfVolunteer.replace(/\D/g,"")
    req.body.cepVolunteer = req.body.cepVolunteer.replace(/\D/g,"")

    const dataUser = req.body

    let err = []

    if(!validations.filledField(dataUser.nameVolunteer))
        err.push({msg: "O nome deve ter no mínimo 4 caracteres!"})
        
    if(!validations.filledField(dataUser.lastNameVolunteer))
        err.push({msg: "O sobrenome deve ter no mínimo 4 caracteres!"})

    if(!validations.filledField(dataUser.emailVolunteer))
        err.push({msg: "E-mail inválido"})

    if(!validations.email(dataUser.emailVolunteer))
        err.push({msg: "E-mail inválido"})

    if(!validations.isCPF(dataUser.cpfVolunteer))
        err.push({msg: "CPF inválido!"})

    if(!validations.filledField(dataUser.cepVolunteer))
        err.push({msg: "CEP inválido!"})

    if(!validations.filledField(dataUser.cityVolunteer))
        err.push({msg: "A Cidade deve ter no mínimo 4 caracteres!"})

    if(!validations.filledField(dataUser.districtVolunteer))
        err.push({msg: "O Bairro deve ter no mínimo 4 caracteres"})

    if(!validations.filledField(dataUser.addressVolunteer))
        err.push({msg: "A rua deve ter no mínimo 4 caracteres"})

    if(!validations.filledField(dataUser.passwordVolunteer))
        err.push({msg: "A senha deve ter no mínimo 4 caracteres!"})

    if(!validations.filledField(dataUser.confirmPasswordVolunteer))
        err.push({msg: "Confirmação de senha incorreta!"})

    if(dataUser.passwordVolunteer != dataUser.confirmPasswordVolunteer)
        err.push({msg: "Confirmação de senha incorreta!"})

    if(err.length > 0){
        res.render("register/registerUser", {errs: err})
    }else{
        const resp = await userController.register(dataUser)

        req.flash(resp.type_msg, resp.msg)

        if(resp.type_msg === "success_msg")
            return res.redirect("/")
        else
            return res.redirect("/register")
    }
    
})

module.exports = router