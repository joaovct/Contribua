const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")

router.get("/", async (req, res) => {
    if(req.session.ngo){
        let activeActions = await actionController.listActiveActionsNgo(req.session.ngo.idNgo)
        for(let action of activeActions) action = formatAction(action)
        let actions = {
            activeActions
        }
        if(actions.activeActions.length == 0) actions = false
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, actions})

    }else{
        let recommendedActions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        // Format each action
        for(let action of recommendedActions) action = formatAction(action)
        let actions = {
            recommendedActions
        }
        // Set to null actions if is empty
        if(actions.recommendedActions.length == 0) actions = false
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser, actions})
    }
})

function formatAction(action){
    action.descriptionAction = action.descriptionAction.substring(0,100) + "..."
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    action.createdAt.day = action.createdAt.getDay()
    action.createdAt.month = months[action.createdAt.getMonth()]
    action.createdAt.year = action.createdAt.getFullYear()
    return action
}

module.exports = router