module.exports = {
    isUser: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash("error_msg", "Área restrita!")
            res.redirect("/")
        }
    }
}