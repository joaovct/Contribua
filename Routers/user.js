const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const verifyUserName = require("../helpers/verifyUserName")
const userNgoController = require("../controllers/userNgoController")
const actionController = require("../controllers/actionController")
const telephoneController = require("../controllers/telephoneController")

//GETS
router.get('/:userName', async (req,res)=>{
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    // Render ngo own profile
    if(req.session.ngo){
        if(req.params.userName === req.session.ngo.userName){
            req.session.ngo.createdAt = new Date(req.session.ngo.createdAt)
            req.session.ngo.createdAt.month = months[req.session.ngo.createdAt.getMonth()]
            req.session.ngo.createdAt.year = req.session.ngo.createdAt.getFullYear()
            const category = await causesController.listCausesNgo(req.session.ngo.idNgo)
            const userSubscribed = await userNgoController.listUser(req.session.ngo.idNgo)
            const amtUserSubscribed = userSubscribed.length
            const actions = await actionController.listActiveActionsNgo(req.session.ngo.idNgo)
            const amtActions = actions.length
            const telephonesNgo = await telephoneController.listTelephoneNgo(req.session.ngo.idNgo)
            return res.render("ngo/profile", {data: req.session.ngo, dataHeaderNgo: req.session.ngo, causes: category, isVisit: false, amtUserSubscribed, actions, amtActions, telephonesNgo})
        }

        const user = await verifyUserName.user(req.params.userName)
        if(user){
            user.createdAt.month = months[user.createdAt.getMonth()]
            user.createdAt.year = user.createdAt.getFullYear()
            const category = await causesController.listCausesUser(user.idVolunteer)
            const subscribedNgos = await userNgoController.listNgo(user.idVolunteer)
            const amtSubscribedNgos = subscribedNgos.length
            return res.render("user/profile", {data: user, dataHeaderNgo: req.session.ngo, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer: true, amtSubscribedNgos})
        }
    }

    // Render volunteer own profile
    if(req.params.userName === req.session.user.userName){
        req.session.user.createdAt = new Date(req.session.user.createdAt)
        req.session.user.createdAt.month = months[req.session.user.createdAt.getMonth()]
        req.session.user.createdAt.year = req.session.user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(req.session.user.idVolunteer)
        const subscribedNgos = await userNgoController.listNgo(req.session.user.idVolunteer)
        const amtSubscribedNgos = subscribedNgos.length
        return res.render("user/profile", {data: req.session.user, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: false, isVolunteer: true, amtSubscribedNgos})
    }

    // Render other volunteer profile
    const user = await verifyUserName.user(req.params.userName)
    if(user){
        user.createdAt.month = months[user.createdAt.getMonth()]
        user.createdAt.year = user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(user.idVolunteer)
        const subscribedNgos = await userNgoController.listNgo(user.idVolunteer)
        const amtSubscribedNgos = subscribedNgos.length
        return res.render("user/profile", {data: user, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer: true, amtSubscribedNgos})
    }

    // Render other ngo profile
    const ngo = await verifyUserName.ngo(req.params.userName)
    if(ngo){
        ngo.createdAt.month = months[ngo.createdAt.getMonth()]
        ngo.createdAt.year = ngo.createdAt.getFullYear()
        const category = await causesController.listCausesNgo(ngo.idNgo)
        const userSubscribed = await userNgoController.listUser(ngo.idNgo)
        const amtUserSubscribed = userSubscribed.length
        const actions = await actionController.listActiveActionsNgo(ngo.idNgo)
        const amtActions = actions.length
        const telephonesNgo = await telephoneController.listTelephoneNgo(ngo.idNgo)

        for(let action of actions)
            action = formatAction(action)

        // Checks if user logged is a volunteer or not
        /* is volunteer */ 
        if(!req.session.ngo){
            let isSubscribed = false
            const hasNgo = await userNgoController.listOneNgo(req.session.user.idVolunteer, ngo.idNgo)
            if(hasNgo){
                if(hasNgo.userName === req.params.userName){
                    isSubscribed = true
                }
            }
            
            return res.render("ngo/profile", {data: ngo, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer: true, isSubscribed, amtUserSubscribed, actions, amtActions, telephonesNgo})
        }else{
            /* isnt volunteer */
            return res.render("ngo/profile", {data: ngo, dataHeaderNgo: req.session.ngo, causes: category, isVisit: true, isVolunteer: false, amtUserSubscribed, actions, amtActions, telephonesNgo})
        }
    }
    
    // If not found any volunteer or ngo
    if(req.session.ngo){
        return res.render('error', {dataHeaderNgo: req.session.ngo})
    }else{
        return res.render('error', {dataHeader: req.session.user})
    }
})

function formatAction(action){
    action.descriptionAction = action.descriptionAction.substring(0,100) + "..."
    action.createdAt.day = action.createdAt.getDay()
    action.createdAt.month = action.createdAt.getMonth()+1
    action.createdAt.year = action.createdAt.getFullYear()
    return action
}

module.exports = router