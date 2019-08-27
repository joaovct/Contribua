const localStrategy = require("passport-local").Strategy
const User = require("../models/Volunteer")

module.exports = function (passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        //ve se tem voluntario
        User.findOne({where:{emailVolunteer: email}}).then((user) => {
            if(!user){
                return done(null, false, {msg: "Esta conta não existe"})
            }else{
                if(password === user.passwordVolunteer){
                    return done(null, user)
                }else{
                    return done(null, false, {msg: "A senha está incorreta!"})
                }
            }
        }).catch((err) => {
            console.log("DEU RUIM "+err)
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.idVolunteer)
    })

    passport.deserializeUser((id, done) => {
        User.findOne({where: {idVolunteer: id}}).then((user) => {
            done(null, user)
        })
    })
}