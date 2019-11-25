const PDFDocument = require("pdfkit")
const fs = require("fs")
const moment = require("moment")


module.exports = {
    async event(data){
        let doc = new PDFDocument()

        this.header(doc, data, "Relatório de Presença em Evento")
        this.table(doc, data)

        doc.pipe(fs.createWriteStream(__dirname+"/../reports/relatorio-presenca"+data.action.idAction+".pdf"))
        doc.end()
    },
    async header(doc, data, type){

        let {action, ngo} = data

        doc.image(__dirname+"/../public/assets/imgs/Contribua!.png", 240, 35, {width: 150, align: "center"})
        doc.fontSize(12)
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Regular.ttf").text("Tipo de Relatório: ")
        doc.font("public/assets/fonts/Nunito-Bold.ttf").text(type)
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Regular.ttf").text("Ong: ")
        doc.font("public/assets/fonts/Nunito-Bold.ttf").text(ngo.nameNgo)
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Regular.ttf").text("Evento:")
        doc.font("public/assets/fonts/Nunito-Bold.ttf").text(action.nameAction)
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Regular.ttf").text("Data do Evento:")
        doc.font("public/assets/fonts/Nunito-Bold.ttf").text(moment(action.createdAt).format("DD/MM/YYYY"))
        doc.lineCap('butt').moveTo(72, 280).lineTo(545, 280).stroke();  
    },
    async table(doc, data){
        let {user} = data
        doc.moveDown()
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Bold.ttf")
        doc.text(`Voluntários confirmados:`)
        doc.moveDown()
        doc.font("public/assets/fonts/Nunito-Regular.ttf")
        for(let i in user){
            doc.text(`${user[i].nameVolunteer} ${user[i].lastNameVolunteer}   ${user[i].emailVolunteer}   ${user[i].nameVacancy}`)
        }
    },
}