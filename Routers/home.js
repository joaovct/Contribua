const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")
const causesController = require('../controllers/causesController')
const userNgoController = require("../controllers/userNgoController")
const ngoController = require('../controllers/ngoController')
const userController = require('../controllers/userController')
const feedUtilities = require('../helpers/feedUtilities')

router.get("/", async (req, res) => {
    const causes = await causesController.listCauses()
    if(req.session.ngo){
        let activeActions = await actionController.listActiveActionsNgo(req.session.ngo.idNgo)
        const ngoCauses = await causesController.listCausesNgo(req.session.ngo.idNgo)
        const causesNotParticipe = await causesController.listCausesNotParticipeNgo(req.session.ngo.idNgo)
        for(let action of activeActions) action = feedUtilities.formatAction(action)
        let actions = {
            activeActions
        }
        if(actions.activeActions.length == 0) actions = false
        const membersNgo = await ngoController.listMembersNgo(req.session.ngo.idNgo)
        // res.json(membersNgo)
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, membersNgo, actions, ngoCauses, causesNotParticipe})

    }else{
        // Get articles
        let recommendedActions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        let actionsByInscriptions = await actionController.listActionsByInscriptions(req.session.user.idVolunteer)
        let recommendedNgos = await userNgoController.listRecommendedNgos(req.session.user.idVolunteer)
        let ngosByInscriptions = await userNgoController.listNgo(req.session.user.idVolunteer)

        // Get user cases and cases that user does not participe
        const userCauses = await causesController.listCausesUser(req.session.user.idVolunteer)
        const causesNotParticipe = await causesController.listCausesNotParticipeUser(req.session.user.idVolunteer)

        // Format each action

        let articles = {recommendedActions, actionsByInscriptions, ngosByInscriptions,recommendedNgos}

        // Set to false if is empty
        if(articles.recommendedActions.length < 1
        && articles.actionsByInscriptions.length < 1
        && articles.recommendedNgos.length < 1
        && articles.ngosByInscriptions.length < 1) actions = false

        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser, articles, userCauses, causesNotParticipe})
    }
})

router.post("/filter", async(req, res) => {
    let actions = []
    let ngos = []
    let district
    let causes = await causesController.listCauses()
    if(req.query.key === "subscriptions"){
        actions = await actionController.listActionsByInscriptions(req.session.user.idVolunteer)
        ngos = await userNgoController.listNgo(req.session.user.idVolunteer)
    }

    else if(req.query.key === "recommended"){
        actions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        ngos = await userNgoController.listRecommendedNgos(req.session.user.idVolunteer)
    }
    
    else if(req.query.key === "recents") actions = await actionController.listRecentActions()
    
    else if(req.query.key === "proximity"){
        let data = await actionController.listActionsByProximity(req.session.user.idVolunteer, req.query.distance)
        actions = data.actions
        district = data.district
    } 

    else if(req.query.key === "my-events"){
        actions = await actionController.listAcceptedActionsVolunteer(req.session.user.idVolunteer)
    }

    if(req.query.options){
        let options = req.query.options.split(",")
        actions = await actionController.listActionsByCauses(options)
    }

    // Pass to front an array with the name of ngos
    let nameNgos = []
    if(actions.length > 0){
        for(let action of actions){
            let ngo = await ngoController.listOneNgo(action.idNgo)
            nameNgos.push(ngo.nameNgo)
        }
    }else actions = false

    articles = {
        actions,ngos,district, nameNgos,typeArticles: req.query.key
    }

    res.json(articles)
    
})

router.post("/members-management", async(req, res) => {
    const data = req.body
    let creator = await userNgoController.listUserCreator(req.session.ngo.idNgo)

    if(data.makeAdm){
        let idUser = parseInt(data.makeAdm)

        if(creator.idVolunteer === req.session.user.idVolunteer){
            let user = await userController.listOneUser(idUser)
            await userNgoController.makeAdm(req.session.ngo.idNgo, idUser)
            req.flash("success_msg", user.nameVolunteer+" agora é um administrador!")
        }else{
            req.flash("error_msg", "Apenas o criador da ong pode efetuar essa operação!")
        }
    }

    if(data.removeAdm){
        let idUser = parseInt(data.removeAdm)
        if(creator.idVolunteer === req.session.user.idVolunteer){
            let user = await userController.listOneUser(idUser)
            await userNgoController.removeAdm(req.session.ngo.idNgo, idUser)
            req.flash("success_msg", user.nameVolunteer+" não é mais um administrador!")
        }else{
            req.flash("error_msg", "Apenas o criador da ong pode efetuar essa operação!")
        }
    }
    
    return res.redirect("/home")
})

module.exports = router