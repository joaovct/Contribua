const express = require('express')
const router = express.Router()
const verifyEmail = require("../helpers/verifyEmail")
const verifyUserName = require("../helpers/verifyUserName")
const userNgoController = require("../controllers/userNgoController")

router.post('/', async (req,res) => {
    const dataUser = req.body
    
    const user = await verifyEmail.user(dataUser.emailVolunteer)
    const user2 = await verifyUserName.user(dataUser.emailVolunteer)

    if(user){
        if(user.passwordVolunteer === dataUser.passwordVolunteer){
            req.session.user = user
            req.session.ngoUser = await userNgoController.listNgo(req.session.user.idVolunteer)
            return res.redirect("/home")
        }else{
            req.flash("error_msg", "Senha incorreta!")
            return res.redirect("/")
        }
    }

    if(user2){
        if(user2.passwordVolunteer === dataUser.passwordVolunteer){
            req.session.user = user2
            req.session.ngoUser = await userNgoController.listNgo(req.session.user.idVolunteer)
            return res.redirect("/home")
        }else{
            req.flash("error_msg", "Senha incorreta!")
            return res.redirect("/")
        }
    }

    req.flash("error_msg", "Conta não encontrada!")
    return res.redirect("/")
})

module.exports = router