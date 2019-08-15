const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    userActive = true
    res.render('user/home', {userActive})
})

router.get('/profile', (req,res)=>{
    userActive = true
    res.render('user/profile', {userActive})
})

module.exports = router