const express = require('express')
const router = express.Router()
const Ngo = require("../models/Ngo")
const User = require("../models/Volunteer")

router.post('/', (req,res) => {
    const {email, password} = req.body

    User.findOne({where: {emailVolunteer: email}}).then((user) => {
        if(!user){
            Ngo.findOne({where: {emailNgo: email}}).then((ngo) => {
                if(!ngo){
                    req.flash("error_msg", "Usuário ou senha incorretos!")
                    res.redirect("/")
                }else{
                    if(ngo.passwordNgo != password){
                        req.flash("error_msg", "Senha incorreta!")
                        res.redirect("/")
                    }else{
                        ngo.passwordNgo = undefined
                        req.session.ngo = ngo
                        res.redirect("/ngo")
                    }
                }
            }).catch((err) => {
                console.log("Houve um erro: ", err)
            })
        }else{
            if(user.passwordVolunteer != password){
                req.flash("error_msg", "Senha incorreta!")
                res.redirect("/")
            }else{
                user.passwordVolunteer = undefined
                req.session.user = user
                res.redirect("/user")
            }
        }
    }).catch((err) => {
        console.log("Houve um erro: ",err)
    })
})

module.exports = router