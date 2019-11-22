const NotificationNgo = require("../models/NotificationNgo")
const NotificationVolunteer = require("../models/NotificationVolunteer")
const userController = require("./userController")
const vacancyController = require("./vacancyActionController")
const ngoController = require("./ngoController")
const actionController = require("./actionController")

module.exports = {
    //NGO
    async subscribe(user, idNgo){
        const notification = await NotificationNgo.create({
                                idVolunteer: user.idVolunteer,
                                idNgo: idNgo,
                                msgNotification: "se inscreveu em sua ong",
                                viewedNotification: false
                            })
        return notification
    },
    async subscribeVacancy(user, idVacancy){
        const vacancy = await vacancyController.listVacancyAction(idVacancy)
        const action = await actionController.listOneAction(vacancy.idAction)
        const ngo = await ngoController.listOneNgo(action.idNgo)

        await NotificationNgo.create({
            idVolunteer: user.idVolunteer,
            idNgo: ngo.idNgo,
            msgNotification: "solicitou participação na vaga "+vacancy.nameVacancyAction,
            linkNotification: "/event/"+action.idAction+"/management",
            viewedNotification: false
        })

        return ngo.idNgo
    },
    async listNotificationsNgo(idNgo){
        const notifications = await NotificationNgo.findAll({where: {idNgo: idNgo}})
        let oldNotifications = []
        let newNotifications = []
        let user
        for(let i in notifications){
            user = await userController.listOneUser(notifications[i].idVolunteer)
            if(notifications[i].viewedNotification)
                oldNotifications.push({notification: notifications[i], user: user})
            else
                newNotifications.push({notification: notifications[i], user: user})
        }
        return {oldNotifications, newNotifications}
    },
    async viewedNotificationNgo(idNgo){
        await NotificationNgo.update({viewedNotification: true}, {where: {idNgo: idNgo, viewedNotification: false}})
    },

    //USER
    async listNotificationsUser(idUser){
        const notifications = await NotificationVolunteer.findAll({where: {idVolunteer: idUser}})
        let oldNotifications = []
        let newNotifications = []
        let ngo
        for(let i in notifications){
            ngo = await ngoController.listOneNgo(notifications[i].idNgo)
            if(notifications[i].viewedNotification)
                oldNotifications.push({notification: notifications[i], ngo})
            else
                newNotifications.push({notification: notifications[i], ngo})
        }
        return {oldNotifications, newNotifications}
    },
    async acceptSubscribe(idActionVolunteer){
        const actionVolunteer = await actionController.listOneActionVolunteer(idActionVolunteer)
        const vacancy = await vacancyController.listVacancyAction(actionVolunteer.idVacancyAction)
        const action = await actionController.listOneAction(vacancy.idAction)
        const ngo = await ngoController.listOneNgo(action.idNgo)
        await NotificationVolunteer.create({
            idNgo: action.idNgo,
            idVolunteer: actionVolunteer.idVolunteer,
            msgNotification: "Legal! a ong <strong>"+ngo.userName+"</strong> aceitou sua inscrição na vaga "+vacancy.nameVacancyAction+"! Não se esqueça de comparecer!",
            viewedNotification: false
        })
        return actionVolunteer.idVolunteer
    },
    async refuseSubscribe(idActionVolunteer){
        const actionVolunteer = await actionController.listOneActionVolunteer(idActionVolunteer)
        const vacancy = await vacancyController.listVacancyAction(actionVolunteer.idVacancyAction)
        const action = await actionController.listOneAction(vacancy.idAction)
        const ngo = await ngoController.listOneNgo(action.idNgo)
        await NotificationVolunteer.create({
            idNgo: action.idNgo,
            idVolunteer: actionVolunteer.idVolunteer,
            msgNotification: "Que pena! a ong <strong>"+ngo.userName+"</strong> recusou sua inscrição na vaga "+vacancy.nameVacancyAction+" :/",
            viewedNotification: false
        })
        return actionVolunteer.idVolunteer
    },
    async viewedNotificationUser(idUser){
        await NotificationVolunteer.update({viewedNotification: true}, {where: {idVolunteer: idUser, viewedNotification: false}})
    }
}