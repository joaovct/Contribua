module.exports = (req, res, next) => {
    if(!req.session.user && !req.session.ngo){
        req.flash("error_msg", "Faça login para acessar essa área.")
        return res.redirect("/")
    }

    const route = req.originalUrl.split("/")

    if(req.session.user && !req.session.ngo){
        if(route[1] === "ngo"){
            req.flash("error_msg", "Entre como ong para acessar essa área")
            return res.redirect("/user")
        }
    }

    if(!req.session.user && req.session.ngo){
        if(route[1] === "user"){
            req.flash("error_msg", "Entre como usuário para acessar essa área")
            return res.redirect("/ngo")
        }
    }

    return next()
}