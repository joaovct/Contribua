const express = require('express')
const router = express.Router()
const Ngo = require("../models/Ngo")
const TelephoneNgo = require("../models/TelephoneNgo")
const isCNPJ = require("../helpers/isCNPJ")

router.get('/', (req,res) => {
    res.render('addNGO/presentation')
})

router.get('/add',(req,res)=>{
    res.render('addNGO/addNGO')
    // res.render('addNGO/needLogin')
})

router.post("/registerNGO", (req,res) => {
    let err = []

    //name
    if(!req.body.ngoName || req.body.ngoName == undefined || req.body.ngoName == null){
        console.log("Preencha um nome")
        err.push({msg: "Preencha um nome"})
    }

    //address
    if(!req.body.ngoAddress || req.body.ngoAddress == undefined || req.body.ngoAddress == null){
        console.log("Preencha um endereço")
        err.push({msg: "Preencha um endereço"})
    }

    //Falta validar causas

    //CNPJ
    if(!req.body.ngoCNPJ || req.body.ngoCNPJ == undefined || req.body.ngoCNPJ == null){
        console.log("Preencha um CNPJ")
        err.push({msg: "Preencha o CNPJ"})
    }else{
        if(!isCNPJ(req.body.ngoCNPJ)){
            console.log("CNPJ inválido")
            err.push({msg:"CNPJ invalido"})
        }
    }

    //Telephone
    if(!req.body.ngoTelephone || req.body.ngoTelephone == undefined || req.body.ngoTelephone == null){
        console.log("Preencha um telefone")
        err.push({msg: "Preecha um telefone"})
    }

    //email
    if(!req.body.ngoEmail || req.body.ngoEmail == undefined || req.body.ngoEmail == null){
        console.log("Preencha um Email")
        err.push({msg: "Preecha um Email"})
    }

    //password
    if(!req.body.ngoPassword || req.body.ngoPassword == undefined || req.body.ngoPassword == null){
        console.log("Preencha uma senha")
        err.push({msg: "Preecha uma senha"})
    }

    if(req.body.ngoPassword.length < 4){
        console.log("Senha muito curta!")
        err.push({msg:"Senha muito curta"})
    }

    //confirm password
    if(req.body.ngoPassword != req.body.ngoConfirmPassword){
        console.log("Senhas diferentes!")
        err.push({msg:"Senhas diferentes"})
    }

    if(err.length > 0){
        console.log("Erro ao cadastrar: ")
        res.redirect("/addNGO/")
    }else{
        Ngo.findOne({where: {emailNgo: req.body.ngoEmail}}).then((ngo) => {
            if(ngo){
                console.log("Já existe uma conta com este email!")
                res.redirect("/addNGO/")
            }else{
                Ngo.create({
                    nameNgo: req.body.ngoName,
                    descriptionNgo: req.body.ngoDescription,
                    cnpjNgo: req.body.ngoCNPJ,
                    emailNgo: req.body.ngoEmail,
                    addressNgo: req.body.ngoAddress,
                    averageStarsNgo: "0"
                }).then(() => {
                    console.log("Ong cadastrada com sucesso!")
                    res.redirect("/")
                }).catch((err) => {
                    console.log("Falha ao cadastrar, erro: ", err)
                    res.redirect("/addNGO/")
                })
            }
        }).catch((err) => {
            console.log("Erro interno: ",err)
        })
    }
}) 

module.exports = router