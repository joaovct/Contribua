const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const actionController = require("../controllers/actionController")
const userController = require("../controllers/userController")
const vacancyActionController = require("../controllers/vacancyActionController")
const ngoController = require("../controllers/ngoController")
const multer = require("multer")
const multerConfig = require("../config/multer")

router.get("/", (req, res) => {
    return res.render("ngo/addEventPresentation", {dataHeaderNgo: req.session.ngo})
})

router.get("/register", async (req, res) => {
    const ngo = req.session.ngo
    const causes = await causesController.listCauses()
    const causesNgo = await causesController.listCausesNgo(req.session.ngo.idNgo)
    const causesNotParticipe = await causesController.listCausesNotParticipeNgo(req.session.ngo.idNgo)
    return res.render("ngo/addEvent", {dataHeaderNgo: req.session.ngo, causes, causesNgo, causesNotParticipe, ngo})
})

router.get("/:id", async (req,res) => {
    const action = await actionController.listOneAction(req.params.id)
    const category = await causesController.listCausesAction(req.params.id)
    let vacancies
    let user
    let ngo

    if(!req.session.ngo){
        dataHeader = req.session.user
        dataHeaderNgo = null
    }else{
        dataHeaderNgo = req.session.ngo
        dataHeader = null
    }

    if(action){
        vacancies = await vacancyActionController.listVacanciesAction(action.idAction)
        user = await userController.listOneUser(action.idVolunteer)
        ngo  = await ngoController.listOneNgo(action.idNgo)
        res.render('ngo/event', {action: action, category: category, ngo, user, vacancies, dataHeader, dataHeaderNgo})
    }else{
        res.render('error', {dataHeader, dataHeaderNgo})
    }
})

router.post("/register", multer(multerConfig.action()).single('thumbnail'), async (req,res) => {
    req.body.eventCEP = req.body.eventCEP.replace(/\D/g,"")
    dataAction = req.body
    dataPhoto = req.file
    dataAction.idVolunteer = req.session.user.idVolunteer

    await actionController.register(dataAction, dataPhoto, req.session.ngo.idNgo)

    return res.redirect("/home")
})

router.post("/subscribe", async (req, res) => {
    await actionController.subscribe(req.session.user.idVolunteer, req.query.idAction)
})

module.exports = router