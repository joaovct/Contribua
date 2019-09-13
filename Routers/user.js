const express = require('express')
const router = express.Router()
const User = require("../models/Volunteer")
const Ngo = require("../models/Ngo")
const TelephoneNgo = require("../models/TelephoneNgo")
const validations = require("../helpers/validations")
const ngoController = require("../controllers/ngoController")

router.get('/', (req,res)=>{
    userActive = true
    // res.render('user/home', {data: req.session.user})
    res.render('user/home', {data: true})
})

router.get('/profile', (req,res)=>{
    userActive = true
    res.render('user/profile', {data: req.session.user})
})

router.post('/edit', (req, res) => {
    req.session.user.nameVolunteer = req.body.name
    req.session.user.lastNameVolunteer = req.body.lastName
    req.session.user.biographyVolunteer = req.body.biography
    req.session.user.dateBirthVolunteer = req.body.dateBirth
    req.session.user.photoVolunteer = req.body.photo
    req.session.user.cepVolunteer = req.body.cep
    req.session.user.cityVolunteer = req.body.city
    req.session.user.districtVolunteer = req.body.district
    req.session.user.addressVolunteer = req.body.address
    req.session.user.passwordVolunteer = req.body.password

    User.update({
        nameVolunteer: req.body.name,
        lastNameVolunteer: req.body.lastName,
        passwordVolunteer: req.body.password,
        biographyVolunteer: req.body.biography,
        dateBirthVolunteer: req.body.dateBirth,
        photoVolunteer: req.body.photo,
        cepVolunteer: req.body.cep,
        cityVolunteer: req.body.city,
        districtVolunteer: req.body.district,
        addressVolunteer: req.body.address
    },{where: {idVolunteer: req.session.user.idVolunteer}}).then(() => {
        res.send("funfou")
    }).catch(err => {
        res.send(err)
    })
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

    let err = []

    //validations
    if(!validations.filledField(dataNgo.ngoName))
        err.push({msg: "O nome deve ter no mínimo 4 caracteres!"})

    if(!validations.filledField(dataNgo.ngoAddress))
        err.push({msg: "O endereço deve ter no mínimo 4 caracteres!"})

    if(!validations.isCNPJ(dataNgo.ngoCNPJ))
        err.push({msg: "CNPJ inválido!"})

    if(!validations.filledField(dataNgo.ngoTelephone))
        err.push({msg: "Preencha um telefone!"})

    if(!validations.email(dataNgo.ngoEmail))
        err.push({msg: "Email inválido!"})

    if(err.length > 0){
        res.render("register/addNGO", {errs: err})
    }else{

        const resp = await ngoController.register(dataNgo, req.session.user.idVolunteer)

        req.flash(resp.type_msg, resp.msg)
        if(resp.type_msg === "success_msg")
            return res.redirect("/user")
        else
            return res.redirect("/user/starting-ong/register")
    }
})

module.exports = router