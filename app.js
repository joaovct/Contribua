// Up modules
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const passport = require("passport")
const session = require('express-session')
const flash = require('connect-flash')
const user = require('./Routers/user.js')
const ngo = require('./Routers/ngo.js')
const CRUD = require('./Routers/CRUD.js')
const addUser = require('./Routers/addUser')
require("./config/auth")(passport)
const {isNgo} = require("./helpers/isNGO")
const {isUser} = require("./helpers/isUser")

//**Configs**//
// Session
app.use(session({
    secret: "anythingthatyoushoudntknow",
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.warning_msg = req.flash("warning_msg")
    res.locals.error = req.flash("error")
    next()
})

// body Parser
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Handlebars
app.engine('handlebars', handlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

//public
app.use(express.static(path.join(__dirname, "public")))

// Routers

app.use('/ngo', ngo)
app.use('/user', isUser, user)
// app.use('/user', user)
app.use('/CRUD', CRUD)
app.use('/addUser', addUser)

app.get('/', (req, res) => {
    res.render('index')
})

// app.get('/register',(req,res)=>{
//     res.render('user/registerUser')
// })

// Localhost
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
