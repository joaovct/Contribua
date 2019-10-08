const Action = require("../models/Action")
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
    async listActionNgo(idNgo){
        const action = await Action.findAll({where: {idNgo: idNgo, isActive: true}})
        return action
    }
}