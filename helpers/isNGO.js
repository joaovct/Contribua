module.exports = {
    isNgo: function(req,res,next){
        if(req.isAuthenticated()){
            if(req.user.cnpjNgo){
                return next()
            }else{
                console.log("Área restrita para ongs!")
                res.redirect("/user")
            }
        }else{
            console.log("Área restrita! Faça login!")
            req.flash("error_msg", "Você precisa ser um Admin.")
            res.redirect("/")
        }
    }
}