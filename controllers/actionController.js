const Action = require("../models/Action")
const Volunteer = require('../Models/Volunteer')
const Ngo = require('../Models/Ngo')
const CategoryAction = require('../Models/CategoryAction')
const causesController = require("./causesController")
const vacancyController = require("./vacancyActionController")

module.exports = {
    async register(dataAction, dataPhoto, idNgo){

        if(typeof dataPhoto === "undefined"){
            dataPhoto.filename = "successImage.png"
        }

        const action = await Action.create({
                                    idNgo: idNgo,
                                    nameAction: dataAction.eventTitle,
                                    descriptionAction: dataAction.eventContent,
                                    cepAction: dataAction.eventCEP,
                                    cityAction: dataAction.eventCity,
                                    districtAction: dataAction.eventDistrict,
                                    addressAction: dataAction.eventAddress,
                                    numAddressAction: dataAction.eventAddressNumber,
                                    dateAction: dataAction.eventPDStart+" "+dataAction.eventPHStart,
                                    dateEndAction: dataAction.eventPDStart+" "+dataAction.eventPHEnd,
                                    photoAction: dataPhoto.filename,
                                    isPunctual: true,
                                    isActive: true
                                })
        //cadastra causas
        await causesController.registerCausesAction(action.idAction, dataAction.categories)
    
        const dataVacancy = {
                                jobName: dataAction.jobNameHidden, 
                                jobDescription: dataAction.jobDescriptionHidden,
                                jobAmount: dataAction.jobAmountHidden
                            }
        //cadastra vagas
        await vacancyController.register(dataVacancy, action.idAction)
    },
    async listActiveActionsNgo(idNgo){
        let action = await Action.findAll({where: {idNgo: idNgo, isActive: true}})
        let ngo
        for(let a of action){
            ngo = await Ngo.findOne({where: {idNgo: a.idNgo}, attributes: ['nameNgo']})
            a.nameNgo = ngo.nameNgo
        }
        return action
    },
    
    async listRecommendedActions(idVolunteer){
        // get actions by causes
        const causes = await causesController.listCausesUser(idVolunteer)
        const actionsByCauses = await this.listActionByCauses(causes)
        for(let action of actionsByCauses){
            ngo = await Ngo.findOne({where: {idNgo: action.idNgo}, attributes: ['nameNgo']})
            action.nameNgo = ngo.nameNgo
        }

        // get actions by skills
        // get actions by local

        // randomize actions
        let numbers = [], maxShow = 8, lengthArray = actionsByCauses.length

        if(lengthArray < 4) maxShow = lengthArray

        for(var i = 0; i < maxShow;){
            let pass = true, number = Math.floor((Math.random() * lengthArray - 1) + 1)
            for(let n of numbers) if(n==number) pass = false
            if(pass){
                numbers.push(number)
                i++;
            } 
        }

        let actions = numbers.map((number)=>{
            return actionsByCauses[number]
        })

        return actions
        
        
    },

    async listActionByCauses(causes){
        let actions = []
        let idActions = []
        if(Array.isArray(causes)){
            for(let cause of causes){
                categoriesAction = await CategoryAction.findAll({where: {idCategory: cause.idCategory}})
                for(let categoryAction of categoriesAction){
                    let results = await Action.findAll({where: {idAction: categoryAction.idAction}})
                    for(let r of results){
                        let pass = true
                        for(let id of idActions){
                            if(id == r.idAction) pass = false
                        }
                        if(pass){
                            actions.push(r)
                            idActions.push(r.idAction)
                        }
                    }
                }
            }
        }else{
            categoriesAction = await CategoryAction.findAll({where: {idCategory: causes.idCategory}})
            for(let categoryAction of categoriesAction){
                let results = await Action.findAll({where: {idAction: categoryAction.idAction}})
                for(let r of results){
                    let pass = true
                    for(let id of idActions){
                        if(id == r.idAction) pass = false
                    }
                    if(pass){
                        actions.push(r)
                        idActions.push(r.idAction)
                    }
                }
            }
        }
        return actions
    }
}
