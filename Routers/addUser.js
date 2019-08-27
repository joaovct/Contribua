const express = require('express')
const router = express.Router()
const User = require("../models/Volunteer")
const Ngo = require("../models/Ngo")

router.get("/", () => {
})

router.post("/registerUser", (req, res) => {

    let err = []

    //Name
    if(!req.body.nameVolunteer || req.body.nameVolunteer == undefined ||
        req.body.nameVolunteer == null){
        err.push({msg: "Preencha um nome!"})
    }

    if(req.body.nameVolunteer.length < 4){
        err.push({msg: "Nome muito curto!"})
    }

    //Last name
    if(!req.body.lastNameVolunteer || req.body.lastNameVolunteer == undefined ||
        req.body.lastNameVolunteer == null){
        err.push({msg: "Preencha um sobrenome!"})
    }

    if(req.body.lastNameVolunteer.length < 4){
        err.push({msg: "Sobrenome muito curto!"})
    }

    //Email
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(!regex.test(req.body.emailVolunteer)){
        err.push({msg: "E-mail inválido"})
    }

    //password
    if(!req.body.passwordVolunteer || req.body.passwordVolunteer == undefined || req.body.passwordVolunteer == null){
        err.push({msg: "Preecha uma senha"})
    }

    if(req.body.passwordVolunteer.length < 4){
        err.push({msg:"Senha muito curta"})
    }

    if(err.length > 0){
        res.render("index", {errs: err})
    }else{
        Ngo.findOne({where: {emailNgo: req.body.emailVolunteer}}).then((ngo) => {
            if(ngo){
                req.flash("error_msg", "Já existe uma conta com este Email!")
                res.redirect("/")
            }else{
                User.findOne({where: {emailVolunteer: req.body.emailVolunteer}}).then((user) => {
                    if(user){
                        req.flash("error_msg", "Já existe uma conta com este Email!")
                        res.redirect("/")
                    }else{
                        User.create({
                            nameVolunteer: req.body.nameVolunteer,
                            lastNameVolunteer: req.body.lastNameVolunteer,
                            emailVolunteer: req.body.emailVolunteer,
                            passwordVolunteer: req.body.passwordVolunteer,
                            genreVolunteer: "M",
                            dateBirthVolunteer: "26/06/2001",
                            addressVolunteer: "Rua Genérica"
                        }).then(() => {
                            req.flash("success_msg", "Usuário cadastrado com sucesso!")
                            res.redirect("/")
                        }).catch((err) => {
                            console.log("Erro interno: ", err)
                        })
                    }
                }).catch((err) => {
                    console.log("Erro interno: ", err)
                })
            }
        }).catch((err) => {
            console.log("Erro interno: ", err)
            res.redirect("/")
        })
    }
    
})

module.exports = router