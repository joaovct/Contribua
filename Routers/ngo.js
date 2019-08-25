const express = require('express')
const router = express.Router()
userActive = true
router.get('/', (req,res)=>{
    res.render('ngo/ngoHome', {userActive})
})

router.get('/profile', (req,res)=>{
    res.render('ngo/ngoProfile', {userActive})
})

router.get('/addEvent', (req,res)=>{
    res.render('ngo/addEventPresentation', {userActive})
})

router.get('/addEvent/add', (req,res)=>{
    res.render('ngo/addEvent')

})

module.exports = router