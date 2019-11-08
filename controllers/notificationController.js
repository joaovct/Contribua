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
            msgNotification: "solicitou participação na vaga de "+vacancy.nameVacancyAction,
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
    }
}