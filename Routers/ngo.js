const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('ngo/ngoHome', {data: req.session.ngo})
})

router.get('/profile', (req,res)=>{
    res.render('ngo/ngoProfile', {data: req.session.ngo})
})

router.get('/addEvent', (req,res)=>{
    res.render('ngo/addEventPresentation', {data: req.session.ngo})
})

router.get('/addEvent/add', (req,res)=>{
    res.render('ngo/addEvent')
})

module.exports = router