const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    userActive = true
    res.render('ngo/ngoHome', {userActive})
})

router.get('/profile', (req,res)=>{
    userActive = true
    res.render('ngo/ngoProfile', {userActive})
})

router.get('/addEvent', (req,res)=>{
    userActive = true
    res.render('ngo/addEvent', {userActive})
})

module.exports = router