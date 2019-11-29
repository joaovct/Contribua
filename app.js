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
const actionController = require('./controllers/actionController')
const ngoController = require('./controllers/ngoController')
const ratingController = require('./controllers/ratingController')

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

//reports
app.use("/reports", isLogged, express.static(path.join(__dirname, "reports")))

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
    let notificationsUser
    let session = socket.handshake.session

    socket.emit('init', session)

    if(session){
        if(session.ngo){
            notificationsNgo = await notificationController.listNotificationsNgo(session.ngo.idNgo)
            socket.emit('notificationNgo', notificationsNgo)
        }else if(session.user){
            notificationsUser = await notificationController.listNotificationsUser(session.user.idVolunteer)
            socket.emit('notificationUser', notificationsUser)
        }
    }

    //NGO notifications
    socket.on('subscribe', async (idNgo) => {
        await notificationController.subscribe(session.user, idNgo)
        notificationsNgo = await notificationController.listNotificationsNgo(idNgo)
        socket.broadcast.emit('notificationNgo', notificationsNgo)
    })

    socket.on('subscribe-vacancy', async (idVacancy) => {
        const idNgo = await notificationController.subscribeVacancy(session.user, idVacancy)
        notificationsNgo = await notificationController.listNotificationsNgo(idNgo)
        socket.broadcast.emit('notificationNgo', notificationsNgo)
    })

    socket.on('rating-alert-ngo', async (idAction) => {
        let ngo = await notificationController.ratingNotificationNgo(idAction)
        let notificationsNgo = await notificationController.listNotificationsNgo(ngo.idNgo)
        socket.emit('notificationNgo', notificationsNgo)
    })

    //User notifications
    socket.on('accept-subscribe', async (idActionVolunteer) => {
        const idUser = await notificationController.acceptSubscribe(idActionVolunteer)
        notificationsUser = await notificationController.listNotificationsUser(idUser)
        socket.broadcast.emit('notificationUser', notificationsUser)
    })

    socket.on('refuse-subscribe', async (idActionVolunteer) => {
        const idUser = await notificationController.refuseSubscribe(idActionVolunteer)
        notificationsUser = await notificationController.listNotificationsUser(idUser)
        socket.broadcast.emit('notificationUser', notificationsUser)
    })

    socket.on('make-adm', async (data) => {
        await notificationController.makeAdm(data.idUser, data.idNgo)
        notificationsUser = await notificationController.listNotificationsUser(data.idUser)
        socket.broadcast.emit('notificationUser', notificationsUser)
    })

    socket.on('remove-adm', async(data) => {
        await notificationController.removeAdm(data.idUser, data.idNgo)
        notificationsUser = await notificationController.listNotificationsUser(data.idUser)
        socket.broadcast.emit('notificationUser', notificationsUser)
    })

    socket.on('rating-alert-volunteer', async (idAction) => {
        let volunteers = await notificationController.ratingNotificationVolunteer(idAction)
        console.log(volunteers)
        await volunteers.forEach(async (volunteer)=>{

            let notificationUser = await notificationController.listNotificationsUser(volunteer.idVolunteer)
            socket.broadcast.emit('notificationUser', notificationUser)

        })
    })

    socket.on('viewed', async () => {
        if(session.ngo)
            await notificationController.viewedNotificationNgo(session.ngo.idNgo)
        else
            await notificationController.viewedNotificationUser(session.user.idVolunteer)
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

app.post('/search', async (req,res)=>{
    res.json(await search.doSearch(req.query.key))
})

app.post('/searchVolunteer', async (req,res)=>{
    res.json(await search.doSearchVolunteer(req.query.key))
})

app.post('/:id/ngo-rating/', async (req,res)=>{
    let idVolunteer = req.session.user.idVolunteer
    let idAction = req.params.id
    let action = await actionController.listOneAction(idAction)
    let ngo = await ngoController.listOneNgo(action.idNgo)
    let isRated = await ratingController.checksNgoIsRated(ngo.idNgo, idVolunteer, idAction)
    if(isRated){
        res.json({isRated: true, alert: {title: "ONG já avaliada", message: "Não é possível avaliar novamente esta ONG por meio desse evento.", type: "error"}})
    }else{
        res.json({isRated: false, action, ngo, alert: "none"})
    }
})

app.post('/:id/ngo-rating/:value/finish', async (req,res)=>{
    let value = req.params.value
    let idVolunteer = req.session.user.idVolunteer
    let idAction = req.params.id
    let action = await actionController.listOneAction(idAction)
    let idNgo = action.idNgo
    let averageStars = await ratingController.updateAverageStarsNgo(idNgo, idVolunteer, idAction, value)
    res.json({alert: {title: "Sucesso!",message: `ONG avaliada com sucesso.`,type:"success"}})
})

// Localhost
const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})
