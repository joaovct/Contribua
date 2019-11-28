const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const verifyUserName = require("../helpers/verifyUserName")
const userNgoController = require("../controllers/userNgoController")
const actionController = require("../controllers/actionController")
const ngoController = require('../controllers/ngoController')
const telephoneController = require("../controllers/telephoneController")
const feedUtilities = require('../helpers/feedUtilities')

//GETS
router.get('/:userName', async (req,res)=>{
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    // Render ngo own profile
    if(req.session.ngo){
        if(req.params.userName === req.session.ngo.userName){
            const idNgo =  req.session.ngo.idNgo
            req.session.ngo.createdAt = new Date(req.session.ngo.createdAt)
            req.session.ngo.createdAt.month = months[req.session.ngo.createdAt.getMonth()]
            req.session.ngo.createdAt.year = req.session.ngo.createdAt.getFullYear()
            const membersNgo = await ngoController.listMembersNgo(idNgo)
            const category = await causesController.listCausesNgo(idNgo)
            
            
            let actions = await actionController.listActionsNgo(idNgo)
            for(let action of actions) action = feedUtilities.formatAction(action)

            const amtMembers = membersNgo.length
            const amtActions = actions.length
            const telephonesNgo = await telephoneController.listTelephoneNgo(idNgo)
            return res.render("ngo/profile", {data: req.session.ngo, dataHeaderNgo: req.session.ngo, causes: category, isVisit: false, amtMembers, actions, amtActions, telephonesNgo})
        }

        const user = await verifyUserName.user(req.params.userName)
        if(user){
            const idVolunteer = user.idVolunteer
            user.createdAt.month = months[user.createdAt.getMonth()]
            user.createdAt.year = user.createdAt.getFullYear()
            const category = await causesController.listCausesUser(idVolunteer)
            const ngos = await userNgoController.listNgo(idVolunteer)
            const actions = await actionController.listAcceptedActionsVolunteer(idVolunteer)
            const amtActions = actions.length
            const amtSubscribedNgos = ngos.length
            return res.render("user/profile", {data: user, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer: true, actions, amtActions, amtSubscribedNgos})
        }
    }

    // Render volunteer own profile
    if(req.params.userName === req.session.user.userName){
        const idVolunteer = req.session.user.idVolunteer
        req.session.user.createdAt = new Date(req.session.user.createdAt)
        req.session.user.createdAt.month = months[req.session.user.createdAt.getMonth()]
        req.session.user.createdAt.year = req.session.user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(idVolunteer)
        const ngos = await userNgoController.listNgo(idVolunteer)
        const actions = await actionController.listAcceptedActionsVolunteer(idVolunteer)
        const amtActions = actions.length
        const amtNgos = ngos.length
        return res.render("user/profile", {data: req.session.user, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: false, isVolunteer: true, actions, ngos, amtActions, amtNgos})
    }

    // Render other volunteer profile
    const user = await verifyUserName.user(req.params.userName)
    if(user){
        const idVolunteer = user.idVolunteer
        user.createdAt.month = months[user.createdAt.getMonth()]
        user.createdAt.year = user.createdAt.getFullYear()
        const category = await causesController.listCausesUser(idVolunteer)
        const ngos = await userNgoController.listNgo(idVolunteer)
        const actions = await actionController.listAcceptedActionsVolunteer(idVolunteer)
        const amtActions = actions.length
        const amtSubscribedNgos = ngos.length
        return res.render("user/profile", {data: user, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer: true, actions, amtActions, amtSubscribedNgos})
    }

    // Render other ngo profile
    const ngo = await verifyUserName.ngo(req.params.userName)
    if(ngo){
        const idNgo = ngo.idNgo
        ngo.createdAt.month = months[ngo.createdAt.getMonth()]
        ngo.createdAt.year = ngo.createdAt.getFullYear()
        
        const membersNgo = await ngoController.listMembersNgo(idNgo)
        const category = await causesController.listCausesNgo(idNgo)
            
        let actions = await actionController.listActionsNgo(idNgo)
        for(let action of actions) action = feedUtilities.formatAction(action)

        const amtMembers = membersNgo.length
        const amtActions = actions.length
        const telephonesNgo = await telephoneController.listTelephoneNgo(idNgo)

        // Checks if user logged is a volunteer or not
        /* is volunteer */ 
        if(!req.session.ngo){
            let isSubscribed = false
            isVolunteer = true
            const hasNgo = await userNgoController.listOneNgo(req.session.user.idVolunteer, ngo.idNgo)
            if(hasNgo){

                if(hasNgo.isCreator)
                    isVolunteer = false
                else
                    isVolunteer = true

                if(hasNgo.userName === req.params.userName)
                    isSubscribed = true
                
            }
            
            return res.render("ngo/profile", {data: ngo, dataHeader: req.session.user, causes: category, ngos: req.session.ngoUser, isVisit: true, isVolunteer, isSubscribed, amtMembers, actions, amtActions, telephonesNgo})
        }else{
            /* isnt volunteer */
            isVolunteer = false
            return res.render("ngo/profile", {data: ngo, dataHeaderNgo: req.session.ngo, causes: category, isVisit: true, isVolunteer, amtMembers, actions, amtActions, telephonesNgo})
        }
    }
    
    // If not found any volunteer or ngo
    if(req.session.ngo){
        return res.render('error', {dataHeaderNgo: req.session.ngo})
    }else{
        return res.render('error', {dataHeader: req.session.user})
    }
})

module.exports = router