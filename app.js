// Up modules
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const app = express()
const http = require('http').createServer(app)
const io = require("socket.io")(http)
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cookie = cookieParser("anythingthatyoushoudntknow")
const flash = require('connect-flash')
const user = require('./Routers/user.js')
const register = require('./Routers/register')
const isLogged = require('./helpers/isLogged')
const search = require('./helpers/doSearch')
const login = require('./Routers/login')
const loginNgo = require("./Routers/login-ngo")
const ajax_checkers = require('./Routers/ajax-checkers')
const home = require("./Routers/home")
const starting_ong = require("./Routers/starting-ong")
const subscribe = require("./Routers/subscribe")
const settings = require("./Routers/settings")
const event = require("./Routers/event")
const MemoryStore = require('memorystore')(session)
const store = new MemoryStore()
const notificationController = require("./controllers/notificationController")

//**Configs**//
//cookie
app.use(cookieParser("anythingthatyoushoudntknow"))

// Session
app.use(session({
    secret: "anythingthatyoushoudntknow",
    resave: true,
    saveUninitialized: true,
    store: store
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

//sockets
io.use(function(socket, next) {
    let data = socket.request
    cookie(data, {}, function(err) {
        let sessionID = data.signedCookies["connect.sid"]
        store.get(sessionID, function(err, session) {
        if (err || !session) {
            return next(new Error('Acesso negado!'))
        } else {
            socket.handshake.session = session
            return next()
        }
        })
    })
})

io.on('connection', async (socket) => {

    let notificationsNgo
    let session = socket.handshake.session

    if(session)
        if(session.ngo)
            notificationsNgo = await notificationController.listNotificationsNgo(session.ngo.idNgo)
        
    
    socket.emit('init', {session, notificationsNgo})

    //NGO notifications
    socket.on('subscribe', async (idNgo) => {
        await notificationController.subscribe(session.user, idNgo)
        notificationsNgo = await notificationController.listNotificationsNgo(idNgo)
        socket.broadcast.emit('notificationNgo', notificationsNgo)
    })
    
})

// Routers
app.get("/", (req, res) => {
    if(req.session.user){
        return res.redirect("/home")
    }
    return res.render("index")
})

app.use("/login", login)
app.use("/login-ngo", loginNgo)
app.get("/logout", (req, res) => {
    if(req.session.ngo){
        req.session.ngo = undefined
        return res.redirect("/home")
    }
    req.session.destroy()
    return res.redirect("/")
})
app.use("/home", isLogged, home)
app.use("/home", home)
app.use("/register", register)
app.use("/starting-ong", isLogged, starting_ong)
app.use("/subscribe", isLogged, subscribe)
app.use("/settings", isLogged, settings)
app.use("/event", isLogged, event)
app.use("/ajax-checkers", ajax_checkers)
app.use("/", isLogged, user)

app.post('/search', async function(req,res){
    res.json(await search.doSearch(req.query.key))
})

// Localhost
const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
