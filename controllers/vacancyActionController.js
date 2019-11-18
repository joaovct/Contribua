const VacancyAction = require("../models/VacancyAction")
const userController = require('../controllers/userController')
const actionVolunteer = require('../models/ActionVolunteer')

module.exports = {
    async register(dataVacancy, idAction){
        if(Array.isArray(dataVacancy.jobName)){
            for(let i in dataVacancy.jobName){
                await VacancyAction.create({
                    idAction: idAction,
                    qtdVacancyAction: dataVacancy.jobAmount[i],
                    nameVacancyAction: dataVacancy.jobName[i],
                    descVacancyAction: dataVacancy.jobDescription[i]
                }) 
            }
        }else{
            await VacancyAction.create({
                idAction: idAction,
                qtdVacancyAction: dataVacancy.jobAmount,
                nameVacancyAction: dataVacancy.jobName,
                descVacancyAction: dataVacancy.jobDescription
            })
        }
    },
    async edit(dataVacancy){
        if(Array.isArray(dataVacancy.idVacancy)){
            for(let i = 0; i < dataVacancy.idVacancy.length; i++){
                await VacancyAction.update({
                    nameVacancyAction: dataVacancy.nameVacancy[i],
                    descVacancyAction: dataVacancy.descVacancy[i],
                    qtdVacancyAction: dataVacancy.qtdVacancy[i]
                }, {where: {idVacancyAction: dataVacancy.idVacancy[i]}})
            }
        }else{
            await VacancyAction.update({
                nameVacancyAction: dataVacancy.nameVacancy,
                descVacancyAction: dataVacancy.descVacancy,
                qtdVacancyAction: dataVacancy.qtdVacancy
            }, {where: {idVacancyAction: dataVacancy.idVacancy}})
        }
    },
    async listVacanciesAction(idAction){
        const vacancyAction = await VacancyAction.findAll({where: {idAction}})
        return vacancyAction
    },
    async listVacancyAction(idVacancyAction){
        const vacancyAction = await VacancyAction.findOne({where: {idVacancyAction}})
        return vacancyAction
    },
    async listVolunteersWithVacancy(idVacancyAction){
        const volunteersVacancy = await actionVolunteer.findAll({where: {idVacancyAction, acceptedNgo: null}})
        let volunteersWithVacancy = volunteersVacancy.map( async (volunteerVacancy)=>{
            let vacancy = await this.listVacancyAction(volunteerVacancy.idVacancyAction)
            let volunteer = await userController.listOneUser(volunteerVacancy.idVolunteer)
            let Volunteer = {
                idActionVolunteer: volunteerVacancy.idActionVolunteer,
                photoVolunteer: volunteer.photoVolunteer,
                nameVolunteer: volunteer.nameVolunteer,
                lastNameVolunteer: volunteer.lastNameVolunteer,
                cityVolunteer: volunteer.cityVolunteer,
                averageStarVolunteer: volunteer.averageStarVolunteer,
                nameVacancy: vacancy.nameVacancyAction,
                isSubscribed: null,
            }
            return Volunteer
        })
        volunteersWithVacancy = await Promise.all(volunteersWithVacancy).then( (results) => {return results})
        return volunteersWithVacancy
    }
}