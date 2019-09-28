const Volunteer = require('../models/Volunteer')
const Ngo = require('../models/Ngo')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var results = []

async function findVolunteers(key){
    const users = await Volunteer.findAll({
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("nameVolunteer")," ", Sequelize.col("lastNameVolunteer")), {
            [Op.like]: key
        })
    })
    for(let volunteer of users){
        let object = {
            typeResult: "volunteer",
            name: volunteer.dataValues.nameVolunteer + " " + volunteer.dataValues.lastNameVolunteer,
            userName: volunteer.dataValues.userName
            // picture: volunteer.dataValues.pictureVolunteer
        }
        results.push( object )
    }
}

async function findNgos(key){

    await Ngo.findAll({
        where: {
            nameNgo: {[Op.like]: key}
        }
    }).then((data)=>{
        for(let ngo of data){
            let object = {
                typeResult: "ngo",
                name: ngo.dataValues.nameNgo 
            }
            results.push( object )
        }
    })
}

module.exports = {
    doSearch: async function(key){
        results = []
        key = "%" + key + "%"
        await findVolunteers(key)
        await findNgos(key)
        // await
        // await console.log(results)
        return results
    }
}