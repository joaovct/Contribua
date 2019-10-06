const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const verifyUserName = require("../helpers/verifyUserName")

//GETS
router.get('/:userName', async (req,res)=>{
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    if(req.session.ngo){
        if(req.params.userName === req.session.ngo.userName){
            req.session.ngo.createdAt = new Date(req.session.ngo.createdAt)
            req.session.ngo.createdAt.month = months[req.session.ngo.createdAt.getMonth()]
            req.session.ngo.createdAt.year = req.session.ngo.createdAt.getFullYear()
            const category = await causesController.listCausesNgo(req.session.ngo.idNgo)
            return res.render("ngo/ngoProfile", {data: req.session.ngo, dataHeaderNgo: req.session.ngo, causes: category})
        }
    }

    if(req.params.userName === req.session.user.userName){
        req.session.user.createdAt = new Date(req.session.user.createdAt)
        req.session.user.createdAt.month = months[req.session.user.createdAt.getMonth()]
        req.session.user.createdAt.year = req.session.user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(req.session.user.idVolunteer)
        return res.render("user/profile", {data: req.session.user, causes: category, dataHeader: req.session.user})
    }

    const user = await verifyUserName.user(req.params.userName)
    if(user){
        user.createdAt.month = months[user.createdAt.getMonth()]
        user.createdAt.year = user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(user.idVolunteer)
        return res.render("user/profile", {data: user, causes: category, dataHeader: req.session.user})
    }

    const ngo = await verifyUserName.ngo(req.params.userName)
    if(ngo){
        ngo.createdAt.month = months[ngo.createdAt.getMonth()]
        ngo.createdAt.year = ngo.createdAt.getFullYear()
        const category = await causesController.listCausesNgo(ngo.idNgo)
        return res.render("ngo/ngoProfile", {data: ngo, causes: category, dataHeader: req.session.user})
    }
    
    if(req.session.ngo){
        return res.render('error', {dataHeaderNgo: req.session.ngo})
    }else{
        return res.render('error', {dataHeader: req.session.user})
    }
})

module.exports = router