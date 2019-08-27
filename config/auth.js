const localStrategy = require("passport-local").Strategy
const User = require("../models/Volunteer")
const Ngo = require("../models/Ngo")

module.exports = function (passport){ 
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {
        //ve se tem voluntario
        User.findOne({where:{emailVolunteer: email}}).then((user) => {
            if(!user){
                Ngo.findOne({where:{emailNgo: email}}).then((user) => {
                    if(!user){
                        console.log("Esta conta não existe!")
                        return done(null, false, {msg: "Esta conta não existe"})
                    }else{
                        if(password === user.passwordNgo){
                            return done(null, user)
                        }else{
                            console.log("Senha incorreta!")
                            return done(null, false, {msg: "A senha está incorreta!"})
                        }
                    }
                }).catch((err) => {
                    console.log("DEU RUIM "+err)
                })
            }else{
                if(password === user.passwordVolunteer){
                    return done(null, user)
                }else{
                    console.log("Esta conta não existe!")
                    return done(null, false, {msg: "A senha está incorreta!"})
                }
            }
        }).catch((err) => {
            console.log("DEU RUIM "+err)
        })
    }))

    passport.serializeUser((user, done) => {
        if(user.idVolunteer){
            done(null, user.idVolunteer)
        }else{
            done(null, user.idNgo)
        }
    })

    passport.deserializeUser((id, done) => {
        User.findOne({where: {idVolunteer: id}}).then((user) => {
            done(null, user)
        })
    })
}