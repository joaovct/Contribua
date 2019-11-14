const Volunteer = require('../models/Volunteer')
const Ngo = require('../models/Ngo')
const Action = require('../Models/Action')
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
            userName: volunteer.dataValues.userName,
            photoVolunteer: volunteer.dataValues.photoVolunteer
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
                name: ngo.dataValues.nameNgo ,
                nameNgo: ngo.dataValues.userName,
                photoNgo: ngo.dataValues.photoNgo
            }
            results.push( object )
        }
    })
}

async function findActions(key){
    const actions = await Action.findAll({
        where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("nameAction")," ", Sequelize.col("descriptionAction")), {
            [Op.like]: key
        })
    })
    actions.map((action)=>{
        let object = {
            typeResult: "action",
            nameAction: action.nameAction,
            photoAction: action.photoAction,
            idAction: action.idAction,
        }
        results.push ( object )
    })
} 

module.exports = {
    doSearch: async function(key){
        results = []
        key = "%" + key + "%"
        await findVolunteers(key)
        await findNgos(key)
        await findActions(key)
        return results
    }
}