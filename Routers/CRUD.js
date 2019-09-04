const express = require('express')
const router = express.Router()
const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")
const TelephoneNgo = require("../models/TelephoneNgo")
const isCNPJ = require("../helpers/isCNPJ")
const login = require('./login')

router.get('/', ()=>{})

router.get('/addNGO', (req,res) => {
    res.render('CRUD/presentation')
})

router.get('/addNGO/add',(req,res)=>{
    res.render('CRUD/addNGO')
})

router.get('/addUser', (req,res)=>{
    res.render('CRUD/registerUser')
})

router.get('/loginForm', (req,res)=>{
    res.render('CRUD/login')
})

router.post("/registerNGO", (req,res) => {
    let err = []

    //name
    if(!req.body.ngoName || req.body.ngoName == undefined || req.body.ngoName == null){
        err.push({msg: "Preencha um nome! =/"})
    }

    if(req.body.ngoName.length < 4){
        err.push({msg: "Nome muito curto! =/"})
    }

    //address
    if(!req.body.ngoAddress || req.body.ngoAddress == undefined || req.body.ngoAddress == null){
        err.push({msg: "Preencha um endereço! =/ =/"})
    }

    if(req.body.ngoAddress.length < 4){
        err.push({msg: "Endereço muito curto!"})
    }

    //Falta validar causas

    //CNPJ
    if(!req.body.ngoCNPJ || req.body.ngoCNPJ == undefined || req.body.ngoCNPJ == null){
        err.push({msg: "Preencha o CNPJ! =/"})
    }else{
        if(!isCNPJ(req.body.ngoCNPJ)){
            err.push({msg:"CNPJ inválido! Tente novamente!"})
        }
    }

    //Telephone
    if(!req.body.ngoTelephone || req.body.ngoTelephone == undefined || req.body.ngoTelephone == null){
        err.push({msg: "Preecha um telefone! =/"})
    }

    //email
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/)
    if(!regex.test(req.body.ngoEmail)){
        err.push({msg: "E-mail inválido! =/"})
    }

    //password
    if(!req.body.ngoPassword || req.body.ngoPassword == undefined || req.body.ngoPassword == null){
        err.push({msg: "Preecha uma senha! =/"})
    }

    if(req.body.ngoPassword.length < 4){
        err.push({msg:"A senha digitada não é válida. Que tal tentar de novo?"})
    }

    //confirm password
    if(req.body.ngoPassword != req.body.ngoConfirmPassword){
        err.push({msg:"Senhas diferentes! =/"})
    }

    if(err.length > 0){
        res.render("addNGO/addNGO", {errs: err})
    }else{
        User.findOne({where: {emailVolunteer: req.body.ngoEmail}}).then((user)=>{
            if(user){
                req.flash("error_msg", "Já existe uma conta com este email!")
                res.redirect("/addNGO/add")
            }else{
                Ngo.findOne({where: {emailNgo: req.body.ngoEmail}}).then((ngo) => {
                    if(ngo){
                        req.flash("error_msg", "Já existe uma conta com este email!")
                        res.redirect("/addNGO/add")
                    }else{
                        Ngo.findOne({where:{cnpjNgo: req.body.ngoCNPJ}}).then((ngo) => {
                            if(ngo){
                                console.log("Já existe uma ong com este CNPJ!")
                                res.redirect("/addNGO/add")
                            }else{
                                //register ong
                                Ngo.create({
                                    nameNgo: req.body.ngoName,
                                    descriptionNgo: req.body.ngoDescription,
                                    cnpjNgo: req.body.ngoCNPJ,
                                    emailNgo: req.body.ngoEmail,
                                    passwordNgo: req.body.ngoPassword,
                                    addressNgo: req.body.ngoAddress,
                                    averageStarsNgo: "0"
                                }).then((ngo) => {
                                    //register your telephone
                                    TelephoneNgo.create({
                                        idNgo: ngo.idNgo,
                                        TelephoneNgo: req.body.ngoTelephone
                                    })
                                    req.flash("success_msg", "Ong cadastrada com sucesso!")
                                    res.redirect("/")
                                }).catch((err) => {
                                    console.log("Falha ao cadastrar, erro: ", err)
                                    res.redirect("/addNGO/add")
                                })
                            }
                        }).catch((err) => {
                            console.log("Erro interno: ",err)
                        })
                    }
                }).catch((err) => {
                    console.log("Erro interno: ",err)
                })
            }
        }).catch((err)=>{
            console.log("Erro interno: ",err)
            res.redirect("/addNGO/add")
        })
    }
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

router.use("/login", login)

router.get("/logout", (req,res) => {
    req.session.destroy()
    res.redirect("/")
})

module.exports = router