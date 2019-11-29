const User = require("../models/Volunteer")
const Ngo = require('../Models/Ngo')
const Rating = require('../models/Rating')

module.exports = {
    // Volunteer
    async updateAverageStarsVolunteer(idVolunteer, idNgo, idAction, value){
        value = parseFloat(value)
        let totalStars = await Rating.findAll({attributes: ['starsVolunteer'], where: {idVolunteer}})
        if(totalStars.length == 0){
            await User.update({
                averageStarsVolunteer: value
            }, {where: {idVolunteer}})
            
            const rating = await Rating.findOne({where: {idAction, idVolunteer}})
            if(rating === null || rating === undefined){
                await Rating.create({
                    idAction,
                    idNgo,
                    idVolunteer,
                    starsVolunteer: value
                })
            }else{
                await Rating.update({
                    idVolunteer,
                    idNgo,
                    starsVolunteer: value
                }, {where: {idAction, idVolunteer}})
            }

            let stars = await User.findOne({attributes: ['averageStarsVolunteer'], where: {idVolunteer}})
            return stars[0]
        }else{
            const rating = await Rating.findOne({where: {idAction, idVolunteer}})
            if(rating === null || rating === undefined){
                await Rating.create({
                    idAction,
                    idNgo,
                    idVolunteer,
                    starsVolunteer: value
                })
            }else{
                await Rating.update({
                    idVolunteer,
                    idNgo,
                    starsVolunteer: value
                }, {where: {idAction, idVolunteer}})
            }

            totalStars = await Rating.findAll({attributes: ['starsVolunteer'], where: {idVolunteer}})
            
            let averageStars = 0
            // let i = 0
            totalStars.map((star,j)=>{
                averageStars += star.starsVolunteer
                i = j + 1
            })
            // i++
            averageStars /= i
            averageStars = averageStars.toFixed(1)

            await User.update({
                averageStarsVolunteer: averageStars
            }, {where: {idVolunteer}})

            return averageStars
        }
    },

    // NGO
    async updateAverageStarsNgo(idNgo, idVolunteer, idAction, value){
        value = parseFloat(value)
        let totalStars = await Rating.findAll({attributes: ['starsNgo'], where: {idNgo}})
        if(totalStars.length == 0){
            await Ngo.update({
                averageStarsNgo: value
            }, {where: {idNgo}})
            
            const rating = await Rating.findOne({where: {idAction, idNgo}})
            if(rating === null || rating === undefined){
                await Rating.create({
                    idAction,
                    idNgo,
                    idVolunteer,
                    starsNgo: value
                })
            }else{
                await Rating.update({
                    idVolunteer,
                    idNgo,
                    starsNgo: value
                }, {where: {idAction, idNgo}})
            }

            let stars = await Ngo.findOne({attributes: ['averageStarsNgo'], where: {idNgo}})
            return stars.averageStarsNgo
        }else{
            const rating = await Rating.findOne({where: {idAction, idNgo}})
            if(rating === null || rating === undefined){
                await Rating.create({
                    idAction,
                    idNgo,
                    idVolunteer,
                    starsNgo: value
                })
            }else{
                await Rating.update({
                    idVolunteer,
                    idNgo,
                    starsNgo: value
                }, {where: {idAction, idNgo}})
            }

            totalStars = await Rating.findAll({attributes: ['starsNgo'], where: {idNgo}})
            
            let averageStars = 0
            // let i = 0
            totalStars.map((star,j)=>{
                averageStars += star.starsNgo
                i = j + 1
            })
            // i++
            averageStars /= i
            averageStars = averageStars.toFixed(1)
            await Ngo.update({
                averageStarsNgo: averageStars
            }, {where: {idNgo}})

            return averageStars
        }
    },
    async checksNgoIsRated(idNgo, idVolunteer, idAction){
        const rating = await Rating.findOne({where: {idNgo, idAction, idVolunteer}})
        if(rating!=null || rating!=undefined){
            if(rating.starsNgo) return true
            else return false
        }else return false
    }
}