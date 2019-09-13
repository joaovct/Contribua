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
const CRUD = require('./Routers/CRUD.js')
// const addUser = require('./Routers/addUser')
const isLogged = require('./helpers/isLogged')
const search = require('./helpers/doSearch')
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

// app.use('/ngo', isLogged, ngo)
app.use('/ngo', ngo)
// app.use('/user', isLogged, user)
app.use('/user', user)
app.use('/CRUD', CRUD)

app.get('/', (req, res) => {
    req.session.destroy()
    res.render('index')
})

app.get('/search', async function(req,res){
    res.json(await search.doSearch(req.query.key))
});

// Localhost
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
