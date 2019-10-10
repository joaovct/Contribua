const express = require('express')
const router = express.Router()
const causesController = require('../controllers/causesController')


router.get('/', (req,res)=>{
    res.render('ngo/home', {data: req.session.ngo})
})

router.get('/profile', (req,res)=>{
    res.render('ngo/profile', {data: req.session.ngo})
})

router.get('/addEvent', (req,res)=>{
    res.render('ngo/addEventPresentation', {data: req.session.ngo})
})

router.get('/addEvent/add', async (req,res)=>{
    const causes = await causesController.listCauses() 
    res.render('ngo/addEvent', {data: req.session.ngo, causes})
})

module.exports = router