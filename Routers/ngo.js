const express = require('express')
const router = express.Router()
userActive = true
router.get('/', (req,res)=>{
    res.render('ngo/ngoHome', {data: {userActive: true}})
})

router.get('/profile', (req,res)=>{
    res.render('ngo/ngoProfile', {data: {userActive: true}})
})

router.get('/addEvent', (req,res)=>{
    res.render('ngo/addEventPresentation', {data: {userActive: true}})
})

router.get('/addEvent/add', (req,res)=>{
    res.render('ngo/addEvent')

})

module.exports = router