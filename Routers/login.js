const express = require('express')
const router = express.Router()
const verifyEmail = require("../helpers/verifyEmail")
const verifyUserName = require("../helpers/verifyUserName")

router.post('/', async (req,res) => {
    const dataUser = req.body

    const user = await verifyEmail.user(dataUser.emailVolunteer)
    const user2 = await verifyUserName.user(dataUser.emailVolunteer)

    if(user){
        if(user.passwordVolunteer === dataUser.passwordVolunteer){
            req.session.user = user
            return res.redirect("/home")
        }else{
            req.flash("error_msg", "Senha incorreta!")
            return res.redirect("/")
        }
    }

    if(user2){
        if(user2.passwordVolunteer === dataUser.passwordVolunteer){
            req.session.user = user2
            return res.redirect("/home")
        }else{
            req.flash("error_msg", "Senha incorreta!")
            return res.redirect("/")
        }
    }

    req.flash("error_msg", "E-mail ou Usuário incorreto!")
    return res.redirect("/")
})

module.exports = router