const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    if(req.session.ngo){
        res.render("ngo/ngoHome", {dataHeaderNgo: req.session.ngo})
    }else{
        res.render("user/home", {dataHeader: req.session.user, ngos: req.session.ngoUser})
    }
})

module.exports = router