const express = require('express')
const router = express.Router()
const verifyEmail = require("../helpers/verifyEmail")

router.get('/', (req, res) => {
    res.render('register/login')
})

router.post('/', async (req,res) => {
    const dataUser = req.body

    const user = await verifyEmail.user(dataUser)

    if(user){
        if(user.passwordVolunteer === dataUser.passwordVolunteer){
            req.session.user = user
            res.redirect("/user")
        }else{
            req.flash("error_msg", "Senha incorreta!")
            res.redirect("/")
        }
    }else{
        req.flash("error_msg", "E-mail incorreto!")
        return res.redirect("/")
    }
})

module.exports = router