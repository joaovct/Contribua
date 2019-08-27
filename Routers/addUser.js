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
        console.log("Preencha um nome!")
        err.push({msg: "Preencha um nome!"})
    }

    if(req.body.nameVolunteer.length < 4){
        console.log("Nome muito curto!")
        err.push({msg: "Nome muito curto!"})
    }

    //Last name
    if(!req.body.lastNameVolunteer || req.body.lastNameVolunteer == undefined ||
        req.body.lastNameVolunteer == null){
        console.log("Preencha um sobrenome!")
        err.push({msg: "Preencha um sobrenome!"})
    }

    if(req.body.lastNameVolunteer.length < 4){
        console.log("Sobrenome muito curto!")
        err.push({msg: "Sobrenome muito curto!"})
    }

    //Email
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(!regex.test(req.body.emailVolunteer)){
        console.log("E-mail inválido")
        err.push({msg: "E-mail inválido"})
    }

    //password
    if(!req.body.passwordVolunteer || req.body.passwordVolunteer == undefined || req.body.passwordVolunteer == null){
        console.log("Preencha uma senha")
        err.push({msg: "Preecha uma senha"})
    }

    if(req.body.passwordVolunteer.length < 4){
        console.log("Senha muito curta!")
        err.push({msg:"Senha muito curta"})
    }

    if(err.length > 0){
        res.redirect("/")
    }else{
        Ngo.findOne({where: {emailNgo: req.body.emailVolunteer}}).then((ngo) => {
            if(ngo){
                console.log("Já existe um usuário com este email!")
                res.redirect("/")
            }else{
                User.findOne({where: {emailVolunteer: req.body.emailVolunteer}}).then((user) => {
                    if(user){
                        console.log("Já existe um usuário com este email!")
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
                            console.log("Usuário cadastrado com sucesso!")
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