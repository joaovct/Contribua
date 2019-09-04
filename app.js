// Up modules
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const user = require('./Routers/user.js')
const ngo = require('./Routers/ngo.js')
const addNGO = require('./Routers/addNGO.js')
const addUser = require('./Routers/addUser')
const login = require('./Routers/login')
const isLogged = require('./helpers/isLogged')

//**Configs**//
// Session
app.use(session({
    secret: "anythingthatyoushoudntknow",
    resave: true,
    saveUninitialized: true
}))

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

app.use('/ngo', isLogged, ngo)
app.use('/user', isLogged, user)
app.use('/addNGO', addNGO)
app.use('/addUser', addUser)
app.use('/login', login)

app.get('/', (req, res) => {
    req.session.destroy()
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render('user/registerUser')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

// Localhost
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
