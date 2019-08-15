const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('addNGO/presentation')
})

router.post('/addNGO',(req,res)=>{
    res.render('addNGO/addNGO')
    // res.render('addNGO/needLogin')
})

module.exports = router