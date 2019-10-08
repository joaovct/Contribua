const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")

router.get("/", async (req, res) => {
    if(req.session.ngo){
        const event = await actionController.listActionNgo(req.session.ngo.idNgo)
        let events = []
        for(let Event of event){
            Event.descriptionAction = Event.descriptionAction.substring(0,100) + "..."
            const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
            let eventDate = new Date(Event.createdAt)
            Event.createdAt.day = eventDate.getDay()
            Event.createdAt.month = months[eventDate.getMonth()]
            Event.createdAt.year = eventDate.getFullYear()
            events.push(Event)
        }
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, activeEvent: events})
    }else{
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser})
    }
})

module.exports = router