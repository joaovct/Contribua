const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")
const causesController = require('../controllers/causesController')
const userNgoController = require("../controllers/userNgoController")
const ngoController = require('../controllers/ngoController')
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
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, actions, ngoCauses, causesNotParticipe})

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

router.post("/ajax", async(req, res) => {
    let recommendedActions
    let recommendedNgos
    if(req.query.subscribies != "undefined"){
        recommendedActions = await actionController.listActionByInscriptions(req.session.user.idVolunteer)
    }else{
        recommendedActions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
    }

    recommendedNgos = await userNgoController.listRecommendedNgos(req.session.user.idVolunteer)

    res.json({recommendedActions, recommendedNgos})
})

module.exports = router