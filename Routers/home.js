const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")
const causesController = require('../controllers/causesController')
const userNgoController = require("../controllers/userNgoController")
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

module.exports = router