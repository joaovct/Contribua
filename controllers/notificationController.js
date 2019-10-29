const NotificationNgo = require("../models/NotificationNgo")
const NotificationVolunteer = require("../models/NotificationVolunteer")
const userController = require("./userController")

module.exports = {
    //NGO
    async subscribe(user, idNgo){
        const notification = await NotificationNgo.create({
                                idVolunteer: user.idVolunteer,
                                userNameVolunteer: user.userName, 
                                idNgo: idNgo,
                                msgNotification: "se inscreveu em sua ong",
                                viewedNotification: false
                            })
        return notification
    },
    async listNotificationsNgo(idNgo){
        const notifications = await NotificationNgo.findAll({where: {idNgo: idNgo, viewedNotification: false}})
        let notifications2 = []
        let user
        for(let i in notifications){
            user = await userController.listOneUser(notifications[i].idVolunteer)
            notifications2.push({notification: notifications[i], user: user})
        }
        return notifications2
    }
}