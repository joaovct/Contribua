// function initMap(){
//     let address = document.querySelector('[data-address]')

//     let district = address.dataset.district
//     let number = address.dataset.number
//     let cep = address.dataset.cep
//     address = address.dataset.address
//     console.log(`${address} ${number} ${district}`)
//     let apiKey = 'AIzaSyA36tg5LqcFuIXDpeMtAlDeVGj87qqxrVk'
//     $.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${number} ${district}+CA&key=${apiKey}`, (data)=>{
//         console.log(data)
//         let location = data.results[0].geometry.location
//         let position = {lat: location.lat, lng: location.lng}
//         let map = new google.maps.Map(document.getElementById('map'), {zoom: 20, center: position})
//         let marker = new google.maps.Marker({position, map})
//     })
// }

let alert
let btnSubscribe = document.getElementsByClassName("subscribe")
let checkboxSubscribe = document.getElementsByClassName("subscribe-checkbox")
let idAction = document.querySelector('[data-idAction]')
idAction = parseInt(idAction.dataset.idaction)

Array.from(btnSubscribe).forEach( (button, i) => {
    let idVacancyAction = parseInt(btnSubscribe[i].parentNode.id)
    button.innerHTML = "Inscrever-se"
    if(checkboxSubscribe[i].checked) button.innerHTML = "Inscrito"
    
    checkboxSubscribe[i].addEventListener("click", async () => {

        if(!checkboxSubscribe[i].checked){
            await $.post("http://localhost:3000/event/subscribe?unsubscribe=true&idVacancyAction="+idVacancyAction, msg => alert = msg)
            if(alert.type === "warning"){
                btnSubscribe[i].innerHTML = "Inscrever-se"
            }
        
        }else{
            await $.post(`http://localhost:3000/event/subscribe?idVacancyAction=${idVacancyAction}&idAction=${idAction}`, msg => alert = msg)
            if(alert.type === "success"){
                btnSubscribe[i].innerHTML = "Inscrito"
                socket.emit('subscribe-vacancy', idVacancyAction)
            }else if(alert.type === "error"){
                checkboxSubscribe[i].checked = false
            }
        }
        callAlert(alert.title, alert.msg, alert.type)
    })
})