module.exports = {
    isNgo: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash("error_msg", "Área restrita para ongs!")
            res.redirect("/")
        }
    }
}