const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")

router.get("/", async (req, res) => {
    if(req.session.ngo){
        const event = await actionController.listActionNgo(req.session.ngo.idNgo)
        let events = []
        for(let Event of event){
            Event = formatEvent(Event)
            events.push(Event)
        }
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, activeEvent: events})
    }else{
        const recommendedActions = await actionController.listRecommendedActions(req.session.user.idVolunteer)
        
        let events = {
            recommendedActions
        }

        // Format each event
        for(let Event of events.recommendedActions){
            Event = formatEvent(Event)
        }
        
        // Set to null events if is empty
        if(events.recommendedActions.length == 0) events = false
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser, events})
    }
})

function formatEvent(Event){
    Event.descriptionAction = Event.descriptionAction.substring(0,100) + "..."
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    Event.createdAt.day = Event.createdAt.getDay()
    Event.createdAt.month = months[Event.createdAt.getMonth()]
    Event.createdAt.year = Event.createdAt.getFullYear()
    return Event
}

module.exports = router