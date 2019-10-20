const VacancyAction = require("../models/VacancyAction")

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
    async listVacanciesAction(idAction){
        const vacancyAction = await VacancyAction.findAll({where: {idAction: idAction}})
        return vacancyAction
    }
}