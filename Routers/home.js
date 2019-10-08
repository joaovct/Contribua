const express = require('express')
const router = express.Router()
const actionController = require("../controllers/actionController")

router.get("/", async (req, res) => {
    if(req.session.ngo){
        const event = await actionController.listActionNgo(req.session.ngo.idNgo)
        res.render("ngo/Home", {dataHeaderNgo: req.session.ngo, activeEvent: event})
    }else{
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser})
    }
})

module.exports = router