const Category = require("../models/Category")
const CategoryVolunteer = require("../models/CategoryVolunteer")
const CategoryNgo = require("../models/CategoryNgo")

module.exports = {
    async registerCausesUser(idUser, categories){
        for(let i in categories){
            const category = await Category.findOne({where: {descCategory: categories[i]}})
    
            if(category){
                CategoryVolunteer.create({
                    idCategory: category.idCategory,
                    idVolunteer: idUser
                })
            }
        }
    },
    async registerCausesNgo(idNgo, categories){
        for(let i in categories){
            const category = await Category.findOne({where: {descCategory: categories[i]}})
    
            if(category){
                CategoryNgo.create({
                    idCategory: category.idCategory,
                    idNgo: idNgo
                })
            }
        }
    }
}