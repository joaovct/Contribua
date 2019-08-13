const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('ngoRegister/presentation')
})

router.post('/addNGO',(req,res)=>{
    userActive = true
    if(!userActive) res.render('ngoRegister/needLogin')
    else res.render('ngoRegister/addNGO')
})

module.exports = router