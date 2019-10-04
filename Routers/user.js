const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const verifyUserName = require("../helpers/verifyUserName")

//GETS
router.get('/:userName', async (req,res)=>{
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    if(req.params.userName === req.session.user.userName){
        req.session.user.createdAt = new Date(req.session.user.createdAt)
        req.session.user.createdAt.month = months[req.session.user.createdAt.getMonth()]
        req.session.user.createdAt.year = req.session.user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(req.session.user.idVolunteer)
        return res.render("user/profile", {data: req.session.user, causes: category, dataHeader: req.session.user})
    }else{
        const user = await verifyUserName.user(req.params.userName)
        if(user){
            user.createdAt.month = months[user.createdAt.getMonth()]
            user.createdAt.year = user.createdAt.getFullYear()
            const category = await causesController.listCausesUser(user.idVolunteer)
            return res.render("user/profile", {data: user, causes: category, dataHeader: req.session.user})
        }else{
            return res.render('error', {data: req.session.user})
        }
    }
})

module.exports = router