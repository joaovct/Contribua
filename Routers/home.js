const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render("user/home", {data: req.session.user, dataHeader: req.session.user})
})

module.exports = router