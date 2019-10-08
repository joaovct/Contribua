const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const actionController = require("../controllers/actionController")
const multer = require("multer")
const multerConfig = require("../config/multer")

router.get("/", (req, res) => {
    return res.render("ngo/addEventPresentation", {dataHeaderNgo: req.session.ngo})
})

router.get("/register", async (req, res) => {
    const categories = await causesController.listCauses()
    return res.render("ngo/addEvent", {dataHeaderNgo: req.session.ngo, causes: categories})
})

router.post("/register", multer(multerConfig.action()).single('thumbnail'), async (req,res) => {
    req.body.eventCEP = req.body.eventCEP.replace(/\D/g,"")
    dataAction = req.body
    dataPhoto = req.file

    await actionController.register(dataAction, dataPhoto, req.session.ngo.idNgo)

    return res.redirect("/home")
})

module.exports = router