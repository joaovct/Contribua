const express = require('express')
const router = express.Router()
const Ngo = require("../models/Ngo")

router.post("/", async (req, res) => {
    req.body.cepNgo = req.body.cepNgo.replace(/\D/g,"")
    const dataNgo = req.body
    const ngo = await Ngo.findOne({where:{userName: dataNgo.userName}})
    req.session.ngo = ngo
    return res.redirect("/home")
})

module.exports = router