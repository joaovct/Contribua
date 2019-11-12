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
    console.log(req.session.ngoUser)
    return res.render("ngo/addEventPresentation", {dataHeaderNgo: req.session.ngo, ngos: req.session.ngoUser})
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
        volunteerSubscribed = await actionController.listActionsVolunteer(req.session.user.idVolunteer)
        vacancies = await vacancyActionController.listVacanciesAction(action.idAction)
        user = await userController.listOneUser(action.idVolunteer)
        ngo  = await ngoController.listOneNgo(action.idNgo)

        let volunteerVacancies = [vacancies.lenght]

        volunteerSubscribed.forEach((volunteer,i)=>{
            vacancies.forEach((vacancy,j)=>{
                volunteerVacancies[j] = {
                    idVacancyAction: vacancy.idVacancyAction,
                    nameVacancyAction: vacancy.nameVacancyAction,
                    descVacancyAction: vacancy.descVacancyAction,
                    qtdVacancyAction: vacancy.qtdVacancyAction,
                    isSubscribed: false
                }
                if(vacancy.idVacancyAction === volunteer.idVacancyAction){
                    volunteerVacancies[j].isSubscribed = true
                }
            })
        })

        // res.json(volunteerVacancies)
        res.render('ngo/event', {action, category, ngo, user, vacancies: volunteerVacancies, dataHeader, dataHeaderNgo, ngos: req.session.ngoUser})
    }else{
        res.render('error', {dataHeader, dataHeaderNgo, ngos: req.session.ngoUser})
    }
})

router.get('/:id/management', async(req,res)=>{
    const action = await actionController.listOneAction(req.params.id)
    const category = await causesController.listCausesAction(req.params.id)
    let vacancies
    let volunteersSubscribers

    dataHeader = req.session.user
    dataHeaderNgo = null
    if(req.session.ngo){
        dataHeaderNgo = req.session.ngo
        dataHeader = null
    }

    if(!req.session.ngo || req.session.ngo.idNgo != action.idNgo){
        res.render('error', {dataHeader, dataHeaderNgo})
    }else{

        if(action.isActive){
            vacancies = await vacancyActionController.listVacanciesAction(action.idAction)
            let idVacancies = vacancies.map((vacancy)=>{
                return vacancy.idVacancyAction
            })
            volunteersSubscribers = await vacancyActionController.listVolunteersWithVacancy(idVacancies)

            res.render('ngo/eventManagement', {action, category, volunteersSubscribers, dataHeader, dataHeaderNgo})
        }else{
            res.render('error', {dataHeader, dataHeaderNgo})
        }
    }
})

router.post("/:id/edit", multer(multerConfig.action()).single('thumbnail'), async (req,res) => {
    let data = req.body
    let dataPhoto = req.file

    if(typeof dataPhoto != "undefined"){
        await actionController.editPhoto(dataPhoto, req.params.id)
    }

    await actionController.edit(data, req.params.id)

    return res.redirect("/event/"+req.params.id+"/management")
})

router.post("/:id/deactivate", async (req,res) => {
    await actionController.deactivate(req.params.id)
    return res.redirect("/home")
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
    if(req.query.unsubscribe){
        res.json(await actionController.unsubscribe(req.session.user.idVolunteer, req.query.idVacancyAction))
    }else{
        res.json(await actionController.subscribe(req.session.user.idVolunteer, req.query.idVacancyAction, req.query.idAction))
    }
})

module.exports = router