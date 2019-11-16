const inputPhoto = document.getElementsByName("thumbnail")[0]
const preview = document.getElementById("preview")

inputPhoto.addEventListener("change", previewPhoto)

const btnAccepted = document.getElementsByClassName("accepted")
const btnRefused = document.getElementsByClassName("refuse")
const row = document.getElementsByClassName("row-subscribe")

for(let i = 0; i < btnAccepted.length; i++){
    btnAccepted[i].addEventListener("click", async () => {
        socket.emit('accept-subscribe', row[i].dataset.id)
        $(row[i]).slideUp("fast")
        await $.post("http://localhost:3000/event/accept-event?accepted=true&idActionVolunteer="+row[i].dataset.id)
    })
}

for(let i = 0; i < btnRefused.length; i++){
    btnRefused[i].addEventListener("click", async () => {
        socket.emit('refuse-subscribe', row[i].dataset.id)
        $(row[i]).slideUp("fast")
        await $.post("http://localhost:3000/event/accept-event?refuse=true&idActionVolunteer="+row[i].dataset.id)
    })
}