const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    userActive = true
    res.render('user/home', {data: {userActive: true}})
})

router.get('/profile', (req,res)=>{
    userActive = true
    res.render('user/profile', {data: {userActive: true, userName: req.user.nameVolunteer, userLastName: req.user.lastNameVolunteer}})
})

module.exports = router