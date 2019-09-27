const express = require('express')
const router = express.Router()
const verifyUserName = require("../helpers/verifyUserName")
const verifyCpf = require("../helpers/verifyCPF")
const verifyEmail = require("../helpers/verifyEmail")
const verifyCNPJ = require("../helpers/verifyCNPJ")

router.get("/", async (req, res) => {
    if(req.query.userName){
        const user = await verifyUserName.user(req.query.userName)
        const ngo = await verifyUserName.ngo(req.query.userName)
        if(user){
            res.json(user)
        }else if(ngo){
            res.json(ngo)
        }else{
            res.json(user)
        }
    }
    if(req.query.cpf){
        res.json(await verifyCpf(req.query.cpf))
    }
    if(req.query.email){
        const user = await verifyEmail.user(req.query.email)
        const ngo = await verifyEmail.ngo(req.query.email)
        if(user){
            res.json(user)
        }else if(ngo){
            console.log("passou2")
            res.json(ngo)
        }else{
            res.json(user)
        }
    }
    if(req.query.cnpj){
        res.json(await verifyCNPJ(req.query.cnpj))
    }
})

module.exports = router