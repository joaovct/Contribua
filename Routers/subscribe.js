const express = require('express')
const router = express.Router()
const userNgoController = require("../controllers/userNgoController")

router.post("/", (req, res) => {
    if(req.query.unsubscribe){
        userNgoController.delete(req.query.idNgo, req.session.user.idVolunteer)
    }else{
        userNgoController.register(req.query.idNgo, req.session.user.idVolunteer)
    }
})

module.exports = router