const sequelize = require('sequelize')
const Op = sequelize.Op
const axios = require('axios')
const Action = require("../models/Action")
const Volunteer = require('../Models/Volunteer')
const Ngo = require('../Models/Ngo')
const UserNgo = require('../Models/UserNgo')
const CategoryAction = require('../Models/CategoryAction')
const VacancyAction = require('../Models/VacancyAction')
const causesController = require("./causesController")
const vacancyController = require("./vacancyActionController")
const userNgo = require("./userNgoController")
const feedUtilities = require('../helpers/feedUtilities')
const ActionVolunteer = require('../models/ActionVolunteer')

const apiKey = "AIzaSyA36tg5LqcFuIXDpeMtAlDeVGj87qqxrVk"
let maxShow = 8
module.exports = {
    async register(dataAction, dataPhoto, idNgo){

        if(typeof dataPhoto === "undefined"){
            dataPhoto.filename = "successImage.png"
        }

        const action = await Action.create({
                                    idNgo: idNgo,
                                    idVolunteer: dataAction.idVolunteer,
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
    async editPunctual(dataAction, idAction){
        await Action.update({
            nameAction: dataAction.name,
            descriptionAction: dataAction.description,
            cepAction: dataAction.cep,
            cityAction: dataAction.city,
            districtAction: dataAction.district,
            addressAction: dataAction.address,
            numAddressAction: dataAction.numAddress,
            dateAction: dataAction.startDate+" "+dataAction.startTime,
            dateEndAction: dataAction.startDate+" "+dataAction.endTime
        }, {where: {idAction}})

        let {idVacancy, nameVacancy, descVacancy, qtdVacancy} = dataAction

        let dataVacancy = {idVacancy, nameVacancy, descVacancy, qtdVacancy}

        await vacancyController.edit(dataVacancy)
    },
    async deactivate(idAction){
        await Action.update({isActive: false},{where: {idAction}})
    },
    async editPhoto(dataPhoto, idAction){
        await Action.update({
            photoAction: dataPhoto.filename
        },{where: {idAction}})
    },
    async listOneAction(idAction){
        const action = await Action.findOne({where: {idAction: idAction}})
        return action
    },
    async listOneActiveAction(idAction){
        const action = await Action.findOne({where: {idAction, isActive: true}})
        return action
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

        for(let action of actions) action = await feedUtilities.formatAction(action)

        return actions
    },
    async listRecommendedActions(idVolunteer){
        // get actions by causes
        const causes = await causesController.listCausesUser(idVolunteer)
        const actionsByCauses = await this.listActionByCauses(causes)
        // get actions by skills

        // randomize actions
        let numbers = [], lengthArray = actionsByCauses.length, maxShow = 8

        if(lengthArray < maxShow) maxShow = lengthArray

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

        for(let action of actions) action = await feedUtilities.formatAction(action)

        return actions
        
        
    },
    async listActionsByInscriptions(idUser){
        let ngos = await userNgo.listNgo(idUser)
        let actions = []
        for(let i in ngos){
            let actionsNgo = await Action.findAll({where: {idNgo: ngos[i].idNgo}, isActive: true})
            for(let j in actionsNgo){
                actions.push(actionsNgo[j])
            }
        }
        
        for(let action of actions) action = await feedUtilities.formatAction(action)

        return actions
    },
    async listRecentActions(){
        let actions = await Action.findAll({limit: maxShow, order: [ ['createdAt','DESC'] ]})
        for(let action of actions) action = await feedUtilities.formatAction(action)
        return actions
    },
    async listActionsByProximity(idUser, radiusDistance){  
        
        let vAddress = await Volunteer.findOne({where: {idVolunteer: idUser}})
        let actions = await Action.findAll({attributes: ['idAction','addressAction', 'numAddressAction', 'districtAction']})

        let origin = this.formatText(vAddress.addressVolunteer + " " + vAddress.districtVolunteer)
        let destination = ""

        // Join actions address and format
        for(let a of actions) destination += `| ${a.addressAction} ${a.numAddressAction} ${a.districtAction}`
        destination = this.formatText(destination)

        let options = { 
            url: `https://maps.googleapis.com/maps/api/distancematrix/json?&origins=${origin}&destinations=${destination}&key=${apiKey}`,
        }

        // Get distance
        let distance = await axios(options).then(response => {
            return response.data.rows[0].elements
        })

        // Get id from close actions
        let radius = radiusDistance
        let idActions = []
        for(let i = 1; i < actions.length; i++){
            let d = Math.round(distance[i].distance.value/1000)
            if(d <= radius) idActions.push(actions[i].idAction)
        }
        let data = {
            actions: await Action.findAll({where: {idAction: idActions}}),
            district: vAddress.districtVolunteer 
        }

        for(let action of data.actions) action = await feedUtilities.formatAction(action)

        return data
    },

    //ACTION VOLUNTEER
    async subscribe(idVolunteer, idVacancyAction, idAction){

        let nameVacancy = await vacancyController.listVacancyAction(idVacancyAction)
        nameVacancy = nameVacancy.nameVacancyAction

        let vacanciesAction = await vacancyController.listVacanciesAction(idAction)
        let idVacanciesActions = vacanciesAction.map((vacancy)=>{
            return vacancy.idVacancyAction
        })
        idVacanciesActions.push(idVacancyAction)

        let actionVolunteer = await ActionVolunteer.findAll({where: {idVolunteer, idVacancyAction: idVacanciesActions}})

        if(actionVolunteer.length > 0){
            return {
                title: "Houve um erro!",
                msg: "Aparentemente você já está inscrito em uma outra vaga desse mesmo evento.",
                type: "error"
            }
        }
        await ActionVolunteer.create({
            idVolunteer: idVolunteer,
            idVacancyAction: idVacancyAction,
            dateInterest: Date.now(),
        })
        return {
            title: "Sucesso!",
            msg: `Você se inscreveu para a vaga de ${nameVacancy}. Aguarde a ONG aprovar a sua inscrição.`,
            type: "success"
        }
    },
    async unsubscribe(idVolunteer, idVacancyAction){
        let nameVacancy = await vacancyController.listVacancyAction(idVacancyAction)
        nameVacancy = nameVacancy.nameVacancyAction

        await ActionVolunteer.destroy({where: {idVolunteer, idVacancyAction}})

        return {
            title: "Inscrição anulada",
            msg: `Você anulou sua inscrição para a vaga de ${nameVacancy}.`,
            type: "warning"
        }
    },
    async listActionsVolunteer(idUser){
        const action = await ActionVolunteer.findAll({where: {idVolunteer: idUser}})
        return action
    },
    async listAcceptedActionsVolunteer(idUser){
        const actionVolunteer = await ActionVolunteer.findAll({where: {idVolunteer: idUser}})
        let acceptedActions = []
        for(let av of actionVolunteer){
            if(av.idVolunteer === idUser && av.acceptedNgo === true){
                let vacancyAction = await vacancyController.listVacancyAction(av.idVacancyAction)
                let action = await this.listOneActiveAction(vacancyAction.idAction)
                action = await feedUtilities.formatAction(action)
                acceptedActions.push(action)
            }
        }
        return acceptedActions
    },
    async listOneActionVolunteer(idActionVolunteer){
        const actionVolunteer = await ActionVolunteer.findOne({where: {idActionVolunteer}})
        return actionVolunteer
    },
    async acceptSubscribe(idActionVolunteer){
        let idVacancy = await ActionVolunteer.findOne({where: {idActionVolunteer}}) 
        idVacancy = idVacancy.idVacancyAction
        let qtdVacancy = await vacancyController.listVacancyAction(idVacancy)
        qtdVacancy = qtdVacancy.qtdVacancyAction

        let qtdInscriptions = await ActionVolunteer.findAll({where: {idVacancyAction: idVacancy, acceptedNgo: true}})
        qtdInscriptions = qtdInscriptions.length

        if(qtdInscriptions < qtdVacancy){
            const actionVolunteer = await ActionVolunteer.update({acceptedNgo: true}, {where: {idActionVolunteer}})
            return actionVolunteer.idVolunteer
        }else{
            return false
        }

        
    },
    async refuseSubscribe(idActionVolunteer){
        const actionVolunteer = await ActionVolunteer.update({acceptedNgo: false}, {where: {idActionVolunteer}})
        return actionVolunteer
    },
    formatText (text){
        text = text.toLowerCase();                                                         
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a')
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e')
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i')
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o')
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u')
        text = text.replace(new RegExp('[Ç]','gi'), 'c')
        return text
    } 
}

