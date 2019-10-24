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
        for(let action of activeActions) action = feedUtilities.formatAction(action)
        let actions = {
            activeActions
        }
        if(actions.activeActions.length == 0) actions = false
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, actions, causes})

    }else{
        let recommendedActions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        let recommendedNgos = await userNgoController.listRecommendedNgos(req.session.user.idVolunteer)
        const userCauses = await causesController.listCausesUser(req.session.user.idVolunteer)
        const causesNotParticipe = await causesController.listCausesNotParticipeUser(req.session.user.idVolunteer)
        // Format each action
        for(let action of recommendedActions) action = feedUtilities.formatAction(action)
        let actions = {
            recommendedActions
        }
        // Set to null actions if is empty
        if(actions.recommendedActions.length == 0) actions = false
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser, actions, recommendedNgos, userCauses, causesNotParticipe})
    }
})

router.post("/filter", async(req, res) => {
    let actions = []
    let ngos = []

    if(req.query.key === "subscriptions") actions = await actionController.listActionByInscriptions(req.session.user.idVolunteer)
    else if(req.query.key === "recommended"){
        actions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        ngos = await userNgoController.listRecommendedNgos(req.session.user.idVolunteer)
    } 

    let nameNgos = []
    for(let action of actions){
        let ngo = await ngoController.listOneNgo(action.idNgo)
        nameNgos.push(ngo.nameNgo)
    }

    articles = {
        actions: actions,
        ngos: ngos,
        nameNgos: nameNgos,
        typeArticles: req.query.key
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