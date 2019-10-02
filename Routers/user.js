const express = require('express')
const router = express.Router()
const causesController = require("../controllers/causesController")
const verifyUserName = require("../helpers/verifyUserName")

//GETS
router.get('/:userName', async (req,res)=>{
    if(req.params.userName === req.session.user.userName){
        const category = await causesController.listCausesUser(req.session.user.idVolunteer)
        return res.render("user/profile", {data: req.session.user, causes: category})
    }else{
        const user = await verifyUserName.user(req.params.userName)
        if(user){
            const category = await causesController.listCausesUser(user.idVolunteer)
            return res.render("user/profile", {data: user, causes: category})
        }else{
            return res.render('error', {data: req.session.user})
        }
    }
})


module.exports = router